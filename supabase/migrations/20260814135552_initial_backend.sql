-- Laser Oral Aid: Supabase Auth, clinical profiles and scheduling.
-- Passwords are managed exclusively by Supabase Auth and never stored here.

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create type public.user_role as enum ('patient', 'professional', 'admin');
create type public.appointment_status as enum ('confirmed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patients (
  id uuid primary key references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 160),
  phone text not null default '',
  age smallint check (age between 0 and 120),
  sex text not null default '',
  city text not null default '',
  address text not null default '',
  therapy_place text not null default '',
  preferred_service text not null default '',
  notes text not null default '' check (char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.professionals (
  id uuid primary key references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 160),
  registry text not null unique check (char_length(registry) between 2 and 80),
  city text not null default '',
  workplace text not null default '',
  service_names text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.availabilities (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professionals(id) on delete cascade,
  service_name text not null,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  interval_minutes smallint not null check (interval_minutes between 10 and 240),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint availability_time_order check (end_time > start_time)
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  availability_id uuid not null references public.availabilities(id) on delete restrict,
  professional_id uuid not null references public.professionals(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete restrict,
  service_name text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text not null default '' check (char_length(notes) <= 500),
  status public.appointment_status not null default 'confirmed',
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index appointments_active_slot_idx
  on public.appointments (availability_id, appointment_time)
  where status = 'confirmed';
create index patients_city_lower_idx on public.patients (lower(city));
create index availabilities_lookup_idx on public.availabilities (appointment_date, service_name, professional_id);
create index appointments_patient_idx on public.appointments (patient_id, appointment_date);
create index appointments_professional_idx on public.appointments (professional_id, appointment_date);

create function private.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid())
$$;

create function private.current_professional_city()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select city from public.professionals where id = (select auth.uid())
$$;

revoke all on function private.current_role() from public, anon;
revoke all on function private.current_professional_city() from public, anon;
grant execute on function private.current_role() to authenticated;
grant execute on function private.current_professional_city() to authenticated;

create function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role public.user_role;
  service_names text[];
begin
  requested_role := case
    when new.raw_user_meta_data ->> 'requested_role' = 'professional' then 'professional'::public.user_role
    else 'patient'::public.user_role
  end;

  insert into public.profiles (id, role, email)
  values (new.id, requested_role, coalesce(new.email, ''));

  if requested_role = 'professional' then
    select coalesce(array_agg(value), '{}') into service_names
    from jsonb_array_elements_text(coalesce(new.raw_user_meta_data -> 'service_names', '[]'::jsonb));

    insert into public.professionals (id, name, registry, city, workplace, service_names)
    values (
      new.id,
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'name'), ''), 'Profissional'),
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'registry'), ''), 'PENDENTE-' || new.id::text),
      coalesce(new.raw_user_meta_data ->> 'city', ''),
      coalesce(new.raw_user_meta_data ->> 'workplace', ''),
      service_names
    );
  else
    insert into public.patients (
      id, name, phone, age, sex, city, address, therapy_place, preferred_service, notes
    ) values (
      new.id,
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'name'), ''), 'Paciente'),
      coalesce(new.raw_user_meta_data ->> 'phone', ''),
      nullif(new.raw_user_meta_data ->> 'age', '')::smallint,
      coalesce(new.raw_user_meta_data ->> 'sex', ''),
      coalesce(new.raw_user_meta_data ->> 'city', ''),
      coalesce(new.raw_user_meta_data ->> 'address', ''),
      coalesce(new.raw_user_meta_data ->> 'therapy_place', ''),
      coalesce(new.raw_user_meta_data ->> 'preferred_service', ''),
      coalesce(new.raw_user_meta_data ->> 'notes', '')
    );
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function private.set_updated_at();
create trigger patients_set_updated_at before update on public.patients
  for each row execute function private.set_updated_at();
create trigger professionals_set_updated_at before update on public.professionals
  for each row execute function private.set_updated_at();
create trigger availabilities_set_updated_at before update on public.availabilities
  for each row execute function private.set_updated_at();
create trigger appointments_set_updated_at before update on public.appointments
  for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.professionals enable row level security;
alter table public.availabilities enable row level security;
alter table public.appointments enable row level security;

create policy "profiles_select_own_or_admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select private.current_role()) = 'admin');

create policy "patients_select_authorized" on public.patients
  for select to authenticated
  using (
    id = (select auth.uid())
    or (select private.current_role()) = 'admin'
    or (
      (select private.current_role()) = 'professional'
      and lower(city) = lower((select private.current_professional_city()))
    )
  );
create policy "patients_update_own_or_admin" on public.patients
  for update to authenticated
  using (id = (select auth.uid()) or (select private.current_role()) = 'admin')
  with check (id = (select auth.uid()) or (select private.current_role()) = 'admin');
create policy "patients_delete_admin" on public.patients
  for delete to authenticated
  using ((select private.current_role()) = 'admin');

create policy "professionals_select_authenticated" on public.professionals
  for select to authenticated using (true);
create policy "professionals_update_own_or_admin" on public.professionals
  for update to authenticated
  using (id = (select auth.uid()) or (select private.current_role()) = 'admin')
  with check (id = (select auth.uid()) or (select private.current_role()) = 'admin');
create policy "professionals_delete_admin" on public.professionals
  for delete to authenticated using ((select private.current_role()) = 'admin');

create policy "availabilities_select_authenticated" on public.availabilities
  for select to authenticated using (true);
create policy "availabilities_insert_owner" on public.availabilities
  for insert to authenticated
  with check (
    professional_id = (select auth.uid())
    and (select private.current_role()) = 'professional'
  );
create policy "availabilities_update_owner_or_admin" on public.availabilities
  for update to authenticated
  using (professional_id = (select auth.uid()) or (select private.current_role()) = 'admin')
  with check (professional_id = (select auth.uid()) or (select private.current_role()) = 'admin');
create policy "availabilities_delete_owner_or_admin" on public.availabilities
  for delete to authenticated
  using (professional_id = (select auth.uid()) or (select private.current_role()) = 'admin');

create policy "appointments_select_participant_or_admin" on public.appointments
  for select to authenticated
  using (
    patient_id = (select auth.uid())
    or professional_id = (select auth.uid())
    or (select private.current_role()) = 'admin'
  );
create policy "appointments_insert_patient" on public.appointments
  for insert to authenticated
  with check (
    patient_id = (select auth.uid())
    and (select private.current_role()) = 'patient'
    and exists (
      select 1 from public.availabilities a
      where a.id = availability_id
        and a.professional_id = professional_id
        and a.service_name = service_name
        and a.appointment_date = appointment_date
        and appointment_time >= a.start_time
        and appointment_time < a.end_time
    )
  );
create policy "appointments_update_participant_or_admin" on public.appointments
  for update to authenticated
  using (
    patient_id = (select auth.uid())
    or professional_id = (select auth.uid())
    or (select private.current_role()) = 'admin'
  )
  with check (
    patient_id = (select auth.uid())
    or professional_id = (select auth.uid())
    or (select private.current_role()) = 'admin'
  );

revoke all on all tables in schema public from anon, authenticated;
grant select on public.profiles, public.patients, public.professionals,
  public.availabilities, public.appointments to authenticated;
grant update on public.patients, public.professionals, public.availabilities to authenticated;
grant delete on public.patients, public.professionals, public.availabilities to authenticated;
grant insert on public.availabilities, public.appointments to authenticated;
grant update (status, cancelled_at, updated_at) on public.appointments to authenticated;

comment on table public.patients is 'Patient records protected by RLS; contains personal and health-adjacent data.';
comment on table public.professionals is 'Professional profiles; passwords remain exclusively in Supabase Auth.';
