drop policy "patients_select_authorized" on public.patients;
create policy "patients_select_authorized" on public.patients
  for select to authenticated
  using (
    id = (select auth.uid())
    or (select private.current_role()) = 'admin'
    or (
      (select private.current_role()) = 'professional'
      and (
        lower(city) = lower((select private.current_professional_city()))
        or exists (
          select 1 from public.appointments a
          where a.patient_id = patients.id
            and a.professional_id = (select auth.uid())
        )
      )
    )
  );
