-- Biblioteca educacional em PDF para profissionais e administradores.

create table public.educational_materials (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete restrict,
  title text not null check (char_length(title) between 3 and 160),
  description text not null default '' check (char_length(description) <= 1000),
  storage_path text not null unique,
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  file_size bigint not null check (file_size between 1 and 15728640),
  created_at timestamptz not null default now()
);

create index educational_materials_created_at_idx
  on public.educational_materials (created_at desc);
create index educational_materials_author_idx
  on public.educational_materials (author_id);

alter table public.educational_materials enable row level security;

create policy "educational_materials_select_professionals" on public.educational_materials
  for select to authenticated
  using ((select private.current_role()) in ('professional', 'admin'));

create policy "educational_materials_insert_professionals" on public.educational_materials
  for insert to authenticated
  with check (
    author_id = (select auth.uid())
    and (select private.current_role()) in ('professional', 'admin')
  );

create policy "educational_materials_delete_owner_or_admin" on public.educational_materials
  for delete to authenticated
  using (
    author_id = (select auth.uid())
    or (select private.current_role()) = 'admin'
  );

revoke all on public.educational_materials from anon, authenticated;
grant select, insert, delete on public.educational_materials to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('educational-materials', 'educational-materials', false, 15728640, array['application/pdf']::text[])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "educational_pdfs_select_professionals" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'educational-materials'
    and (select private.current_role()) in ('professional', 'admin')
  );

create policy "educational_pdfs_insert_professionals" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'educational-materials'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
    and lower(storage.extension(name)) = 'pdf'
    and (select private.current_role()) in ('professional', 'admin')
  );

create policy "educational_pdfs_delete_owner_or_admin" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'educational-materials'
    and (
      owner_id = (select auth.uid()::text)
      or (select private.current_role()) = 'admin'
    )
  );
