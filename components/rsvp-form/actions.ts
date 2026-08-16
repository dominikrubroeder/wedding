"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "dominik.rubroeder@icloud.com";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const guestCount = Number(formData.get("form-guest-count") ?? 0);
  const name = String(formData.get("form-name") ?? "").trim();

  if (!guestCount || !name) {
    return { status: "error", message: "Bitte fülle alle Felder aus." };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      status: "error",
      message: "E-Mail-Versand ist nicht konfiguriert (RESEND_API_KEY fehlt).",
    };
  }

  try {
    const { error } = await resend.emails.send({
      // "from" muss eine auf deiner Resend-Domain verifizierte Adresse sein.
      from: "Kontaktformular <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `Neue Nachricht von ${name}`,
      text: `Gastanzahl: ${guestCount}\nName(n): ${name}`,
    });

    if (error) {
      console.log("[v0] Resend error:", error);
      return {
        status: "error",
        message: "Die Nachricht konnte nicht gesendet werden.",
      };
    }

    return {
      status: "success",
      message: "Danke! Deine Nachricht wurde gesendet.",
    };
  } catch (err) {
    console.log("[v0] Unexpected error sending email:", err);
    return {
      status: "error",
      message: "Es ist ein unerwarteter Fehler aufgetreten.",
    };
  }
}
