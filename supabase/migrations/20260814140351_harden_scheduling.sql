create index availabilities_professional_idx
  on public.availabilities (professional_id);

drop policy "appointments_insert_patient" on public.appointments;
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
        and a.appointment_date >= current_date
        and appointment_time >= a.start_time
        and appointment_time < a.end_time
        and mod(extract(epoch from (appointment_time - a.start_time)) / 60, a.interval_minutes) = 0
    )
  );

drop policy "appointments_update_participant_or_admin" on public.appointments;
create policy "appointments_cancel_participant_or_admin" on public.appointments
  for update to authenticated
  using (
    status = 'confirmed'
    and (
      patient_id = (select auth.uid())
      or professional_id = (select auth.uid())
      or (select private.current_role()) = 'admin'
    )
  )
  with check (
    status = 'cancelled'
    and cancelled_at is not null
    and (
      patient_id = (select auth.uid())
      or professional_id = (select auth.uid())
      or (select private.current_role()) = 'admin'
    )
  );

create function private.sync_user_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set email = coalesce(new.email, ''), updated_at = now()
  where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function private.sync_user_email();
