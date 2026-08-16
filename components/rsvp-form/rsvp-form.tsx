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
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Wird gesendet…
        </>
      ) : (
        <>
          <Mail className="size-4" aria-hidden="true" />
          Abschicken, los geht&apos;s
        </>
      )}
    </Button>
  );
}

export function RsvpForm() {
  const [state, formAction] = useActionState(sendContactForm, initialState);
  const [allergensChecked, setAllergensChecked] = useState(false);
  const [roomsChecked, setRoomsChecked] = useState(false);

  const rsvpOptions = [
    { label: "Ich komme", value: "one-person" },
    { label: "Wir kommen zu zweit", value: "two-persons" },
    { label: "Ich/wir können nicht kommen", value: "none" },
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
            defaultValue="one-person"
            id="form-guest-count"
            required
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
          <FieldLabel htmlFor="form-name">Name(n)</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Madlen, Dominik oder Madlen und Dominik ..."
          />
          <FieldDescription>
            Du/ihr könnt eure Namen einfach kommagetrennt eintragen
          </FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            checked={allergensChecked}
            onCheckedChange={setAllergensChecked}
            id="form-allergens"
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
              <FieldLabel htmlFor="form-allergens-name">Wer?</FieldLabel>
              <Input
                id="form-allergens-name"
                type="text"
                placeholder="Madlen, Dominik ..."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="form-allergens-description">
                Lass uns wissen, auf was wir achten sollen
              </FieldLabel>
              <Input
                id="form-allergens-description"
                type="text"
                placeholder="Laktose, ..."
              />
            </Field>
          </>
        )}

        <Field orientation="horizontal">
          <Checkbox
            checked={roomsChecked}
            onCheckedChange={setRoomsChecked}
            id="form-sleepover"
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
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <CheckCircle2
              className="size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
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
