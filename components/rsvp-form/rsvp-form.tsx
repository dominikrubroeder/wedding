"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useState } from "react";
import {
  ContactFormState,
  sendContactForm,
} from "@/components/rsvp-form/actions";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useFormStatus } from "react-dom";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Wird gesendet…
        </>
      ) : (
        <>
          <Mail className="size-4" aria-hidden="true" />
          Abschicken
        </>
      )}
    </Button>
  );
}

export function RsvpForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactForm,
    initialState,
  );
  const [allergensChecked, setAllergensChecked] = useState(false);
  const [roomsChecked, setRoomsChecked] = useState(false);

  const rsvpOptions = [
    { label: "Ich komme", value: "1" },
    { label: "Wir kommen", value: "2" },
    { label: "Ich/wir können nicht kommen", value: "0" },
  ];

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-sm"
      id="rsvp-form"
    >
      <FieldGroup>
        <Field className="justify-center">
          <FieldLabel htmlFor="form-guest-count">Lass uns wissen</FieldLabel>
          <Select
            items={rsvpOptions}
            defaultValue="1"
            name="form-guest-count"
            id="form-guest-count"
            required
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {rsvpOptions.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-names">Name(n)</FieldLabel>
          <Input
            name="form-names"
            id="form-names"
            type="text"
            placeholder="Madlen, Dominik oder Madlen und Dominik ..."
            disabled={isPending}
          />
          <FieldDescription>
            Du/ihr könnt eure Namen einfach kommagetrennt eintragen
          </FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            checked={allergensChecked}
            onCheckedChange={setAllergensChecked}
            name="form-allergens"
            id="form-allergens"
            disabled={isPending}
          />
          <FieldContent>
            <FieldLabel htmlFor="form-allergens" className="text-base">
              Ich/wir/einer von uns hat Allergene beim Essen
            </FieldLabel>
          </FieldContent>
        </Field>

        {allergensChecked && (
          <>
            <Field>
              <FieldLabel htmlFor="form-allergens-names">Wer?</FieldLabel>
              <Input
                name="form-allergens-names"
                id="form-allergens-names"
                type="text"
                placeholder="Madlen, Dominik ..."
                disabled={isPending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="form-allergens-description">
                Lass uns wissen, auf was wir achten sollen
              </FieldLabel>
              <Input
                name="form-allergens-description"
                id="form-allergens-description"
                type="text"
                placeholder="Laktose, ..."
                disabled={isPending}
              />
            </Field>
          </>
        )}

        <Field orientation="horizontal">
          <Checkbox
            checked={roomsChecked}
            onCheckedChange={setRoomsChecked}
            name="form-sleepover"
            id="form-sleepover"
            disabled={isPending}
          />
          <FieldContent>
            <FieldLabel htmlFor="form-sleepover" className="text-base">
              Ich/wir haben Interesse an einer Übernachtungsmöglichkeit
            </FieldLabel>
            <FieldDescription>
              Wir tauschen uns dann persönlich mit dir/euch aus
            </FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <SubmitButton />
        </Field>

        {state.status === "success" && (
          <p
            role="status"
            className="flex items-center justify-center gap-2 text-sm text-forest"
          >
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}

        {state.status === "error" && (
          <p
            role="alert"
            className="flex items-center gap-2 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}
      </FieldGroup>
    </form>
  );
}
