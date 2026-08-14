import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.111.0/+esm";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./supabase-config.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

function assertNoError(result, fallbackMessage) {
  if (result.error) throw new Error(result.error.message || fallbackMessage);
  return result.data;
}

function patientFromRow(row, email = "") {
  return {
    id: row.id,
    email,
    name: row.name,
    phone: row.phone,
    age: row.age == null ? "" : String(row.age),
    sex: row.sex,
    city: row.city,
    address: row.address,
    therapyPlace: row.therapy_place,
    preferredService: row.preferred_service,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function professionalFromRow(row, email = "") {
  return {
    id: row.id,
    email,
    name: row.name,
    registry: row.registry,
    city: row.city,
    workplace: row.workplace,
    serviceNames: row.service_names || [],
    serviceName: row.service_names?.[0] || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function availabilityFromRow(row) {
  return {
    id: row.id,
    professionalId: row.professional_id,
    serviceName: row.service_name,
    date: row.appointment_date,
    start: String(row.start_time).slice(0, 5),
    end: String(row.end_time).slice(0, 5),
    interval: row.interval_minutes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function appointmentFromRow(row) {
  return {
    id: row.id,
    availabilityId: row.availability_id,
    professionalId: row.professional_id,
    patientId: row.patient_id,
    serviceName: row.service_name,
    date: row.appointment_date,
    time: String(row.appointment_time).slice(0, 5),
    notes: row.notes,
    status: row.status,
    cancelledAt: row.cancelled_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getAccount() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session) return null;
  const profile = assertNoError(
    await supabase.from("profiles").select("id, role, email").eq("id", session.user.id).single(),
    "Não foi possível carregar o perfil."
  );
  return { id: profile.id, role: profile.role, email: session.user.email || profile.email };
}

export async function loadWorkspaceData(account) {
  if (!account) return { patients: [], professionals: [], availabilities: [], appointments: [] };
  const [profileResult, patientResult, professionalResult, availabilityResult, appointmentResult] = await Promise.all([
    supabase.from("profiles").select("id, email"),
    supabase.from("patients").select("*").order("created_at", { ascending: false }),
    supabase.from("professionals").select("*").order("name"),
    supabase.from("availabilities").select("*").order("appointment_date"),
    supabase.from("appointments").select("*").order("appointment_date")
  ]);
  const profileRows = assertNoError(profileResult, "Não foi possível carregar os perfis.");
  const patientRows = assertNoError(patientResult, "Não foi possível carregar pacientes.");
  const professionalRows = assertNoError(professionalResult, "Não foi possível carregar profissionais.");
  const availabilityRows = assertNoError(availabilityResult, "Não foi possível carregar horários.");
  const appointmentRows = assertNoError(appointmentResult, "Não foi possível carregar agendamentos.");
  const emailById = new Map(profileRows.map((row) => [row.id, row.email]));
  return {
    patients: patientRows.map((row) => patientFromRow(row, emailById.get(row.id) || "")),
    professionals: professionalRows.map((row) => professionalFromRow(row, emailById.get(row.id) || "")),
    availabilities: availabilityRows.map(availabilityFromRow),
    appointments: appointmentRows.map(appointmentFromRow)
  };
}

export async function signIn(email, password, expectedRole) {
  assertNoError(
    await supabase.auth.signInWithPassword({ email: email.trim(), password }),
    "Não foi possível entrar."
  );
  const account = await getAccount();
  if (!account || (expectedRole && account.role !== expectedRole)) {
    await supabase.auth.signOut();
    throw new Error("Este acesso não corresponde ao tipo de perfil selecionado.");
  }
  return account;
}

export async function signUp(role, formData, serviceNames = []) {
  const email = formData.email.trim();
  const metadata = role === "professional"
    ? {
        requested_role: role,
        name: formData.name.trim(),
        registry: formData.registry.trim(),
        city: formData.city.trim(),
        workplace: formData.workplace.trim(),
        service_names: serviceNames
      }
    : {
        requested_role: role,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        age: formData.age,
        sex: formData.sex,
        city: formData.city.trim(),
        address: formData.address.trim(),
        therapy_place: formData.therapyPlace.trim(),
        preferred_service: formData.preferredService,
        notes: formData.notes.trim()
      };
  const redirect = new URL(window.location.href);
  redirect.hash = "";
  redirect.search = "";
  const data = assertNoError(
    await supabase.auth.signUp({
      email,
      password: formData.password,
      options: { data: metadata, emailRedirectTo: redirect.toString() }
    }),
    "Não foi possível criar o acesso."
  );
  return { requiresConfirmation: !data.session, email };
}

export async function sendPasswordReset(email) {
  const redirect = new URL(window.location.href);
  redirect.hash = "";
  redirect.search = "";
  assertNoError(
    await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirect.toString() }),
    "Não foi possível enviar a recuperação."
  );
}

export async function updatePassword(password) {
  assertNoError(await supabase.auth.updateUser({ password }), "Não foi possível atualizar a senha.");
}

export async function savePatientRecord(record) {
  const payload = {
    name: record.name,
    phone: record.phone,
    age: record.age === "" ? null : Number(record.age),
    sex: record.sex,
    city: record.city,
    address: record.address,
    therapy_place: record.therapyPlace,
    preferred_service: record.preferredService,
    notes: record.notes
  };
  const row = assertNoError(
    await supabase.from("patients").update(payload).eq("id", record.id).select().single(),
    "Não foi possível salvar o paciente."
  );
  return patientFromRow(row, record.email);
}

export async function saveProfessionalRecord(record) {
  const payload = {
    name: record.name,
    registry: record.registry,
    city: record.city,
    workplace: record.workplace,
    service_names: record.serviceNames
  };
  const row = assertNoError(
    await supabase.from("professionals").update(payload).eq("id", record.id).select().single(),
    "Não foi possível salvar o profissional."
  );
  return professionalFromRow(row, record.email);
}

export async function createAvailability(record) {
  const row = assertNoError(
    await supabase.from("availabilities").insert({
      professional_id: record.professionalId,
      service_name: record.serviceName,
      appointment_date: record.date,
      start_time: record.start,
      end_time: record.end,
      interval_minutes: record.interval
    }).select().single(),
    "Não foi possível publicar os horários."
  );
  return availabilityFromRow(row);
}

export async function deleteAvailability(id) {
  assertNoError(await supabase.from("availabilities").delete().eq("id", id), "Não foi possível remover os horários.");
}

export async function createAppointment(record) {
  const row = assertNoError(
    await supabase.from("appointments").insert({
      availability_id: record.availabilityId,
      professional_id: record.professionalId,
      patient_id: record.patientId,
      service_name: record.serviceName,
      appointment_date: record.date,
      appointment_time: record.time,
      notes: record.notes
    }).select().single(),
    "Não foi possível confirmar o agendamento."
  );
  return appointmentFromRow(row);
}

export async function cancelAppointment(id) {
  const row = assertNoError(
    await supabase.from("appointments")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single(),
    "Não foi possível cancelar o agendamento."
  );
  return appointmentFromRow(row);
}

export async function signOut() {
  assertNoError(await supabase.auth.signOut(), "Não foi possível encerrar a sessão.");
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((event) => callback(event));
}
