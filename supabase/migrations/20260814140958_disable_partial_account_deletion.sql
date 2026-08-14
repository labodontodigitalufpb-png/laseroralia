-- Account deletion requires a dedicated retention and audit workflow.
-- Prevent clients from deleting only the domain row and leaving an orphaned Auth user.
revoke delete on public.patients, public.professionals from authenticated;
drop policy "patients_delete_admin" on public.patients;
drop policy "professionals_delete_admin" on public.professionals;
