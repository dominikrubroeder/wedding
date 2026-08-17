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
  const guestNames = String(formData.get("form-names") ?? "").trim();
  const hasAllergens = formData.get("form-allergens") === "on";
  const allergensNames = formData.get("form-allergens-names");
  const allergensDescription = formData.get("form-allergens-description");
  const hasSleepoverInterest = formData.get("form-sleepover") === "on";

  console.log(
    formData,
    guestCount,
    guestNames,
    hasAllergens,
    allergensNames,
    allergensDescription,
  );

  if (!guestCount || !guestNames) {
    return { status: "error", message: "💆‍♂️ Bitte fülle alle Felder aus." };
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
      from: "Hochzeitsgast RSVP <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `Neue Nachricht von ${guestNames}`,
      text: `Gastanzahl: ${guestCount}\nName(n): ${guestNames}\nAllergene: ${hasAllergens ? "Ja" : "Nein"}\nWer hat Allergene?: ${allergensNames}\nWas für Allergene?: ${allergensNames}\nAllergene Beschreibung: ${allergensDescription}\nInteresse an einer Übernachtungsmöglichkeit: ${hasSleepoverInterest}`,
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
      message:
        guestCount === 1
          ? "Danke! Wir freuen uns auf dich 🫶."
          : guestCount === 2
            ? "Danke! Wir freuen uns auf euch 🫶."
            : "Danke, dass uns Bescheid gegeben hast 🫶.",
    };
  } catch (err) {
    console.log("Unexpected error sending RSVP email:", err);

    return {
      status: "error",
      message:
        "Das hat leider nicht geklappt – wir sind dran, du musst nichts weiteres machen.",
    };
  }
}
