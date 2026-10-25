// Edge function: send-quote
// Recibe los datos del formulario de presupuesto y reenvía un email al
// correo de la empresa (Reformasnyn@hotmail.com) usando Resend.
//
// Requiere el secreto RESEND_API_KEY configurado en el proyecto Supabase.
// Si no está configurado, devuelve 200 con { ok: false, reason: "no-email" }
// para que la solicitud quede guardada en la BD de todos modos.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const COMPANY_EMAIL = "Reformasnyn@hotmail.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, service, description, email, locality, photoUrls } = body ?? {};

    if (!name || !phone || !service || !description) {
      return new Response(
        JSON.stringify({ ok: false, reason: "missing-fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!resendKey) {
      // Sin clave de Resend: la solicitud ya está guardada en la BD.
      return new Response(
        JSON.stringify({ ok: false, reason: "no-email-config", note: "La solicitud se ha guardado en el panel." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const html = `
      <h2>Nueva solicitud de presupuesto — Reformas N&N</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
      ${email ? `<p><strong>Correo:</strong> ${escapeHtml(email)}</p>` : ""}
      ${locality ? `<p><strong>Localidad:</strong> ${escapeHtml(locality)}</p>` : ""}
      <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
      <p><strong>Descripción:</strong></p>
      <p>${escapeHtml(description).replace(/\n/g, "<br>")}</p>
      ${Array.isArray(photoUrls) && photoUrls.length > 0
        ? `<p><strong>Fotos de referencia:</strong></p><ul>${photoUrls.map((u: string) => `<li><a href="${escapeHtml(u)}">${escapeHtml(u)}</a></li>`).join("")}</ul>`
        : ""}
      <hr>
      <p style="color:#888;font-size:12px">Enviado desde el formulario de reformasnyn.es</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Reformas N&N <onboarding@resend.dev>",
        to: COMPANY_EMAIL,
        reply_to: email || undefined,
        subject: `Nueva solicitud de presupuesto — ${service}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ ok: false, reason: "resend-error", detail: text }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, reason: "server-error", detail: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
