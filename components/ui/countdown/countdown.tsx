"use client";

import { cn } from "@/lib/utils";
import { useCountdown } from "@/components/ui/countdown/use-countdown";

export interface CountdownProps {
  /**
   * The date/time to count down to. Accepts a plain date-string like
   * "2027-05-14" (parsed as midnight in `timeZone`), any ISO string, a Date,
   * or a timestamp.
   */
  target: string | Date | number;
  /** IANA timezone for plain date-strings. Defaults to "Europe/Berlin". */
  timeZone?: string;
  /** Called once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Content shown once the countdown has completed, in place of the units. */
  completedContent?: React.ReactNode;
  /** Hide a unit entirely (still counted internally, just not rendered). */
  hideUnits?: Array<"days" | "hours" | "minutes" | "seconds">;
  className?: string;
}

const UNIT_LABELS = {
  days: ["Tag", "Tage"],
  hours: ["Stunde", "Stunden"],
  minutes: ["Minute", "Minuten"],
  seconds: ["Sekunde", "Sekunden"],
} as const;

function unitLabel(key: keyof typeof UNIT_LABELS, value: number) {
  return UNIT_LABELS[key][value === 1 ? 0 : 1];
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function Countdown({
  target,
  timeZone,
  onComplete,
  completedContent,
  hideUnits = [],
  className,
}: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(target, {
    onComplete,
    timeZone,
  });

  if (isComplete && completedContent) {
    return <div className={className}>{completedContent}</div>;
  }

  const units = [
    { key: "days" as const, value: days },
    { key: "hours" as const, value: hours },
    { key: "minutes" as const, value: minutes },
    { key: "seconds" as const, value: seconds },
  ].filter((unit) => !hideUnits.includes(unit.key));

  return (
    <div
      role="timer"
      aria-live="off"
      aria-atomic="true"
      className={cn("relative z-10 flex items-start justify-center", className)}
    >
      {/* The value differs by a second between server render and client
          hydration for a live-ticking countdown, so we suppress the expected
          hydration warning rather than the underlying value. */}
      <span className="sr-only" suppressHydrationWarning>
        {isComplete
          ? "Der Countdown ist abgelaufen"
          : `Noch ${units
              .map((unit) => `${unit.value} ${unitLabel(unit.key, unit.value)}`)
              .join(", ")} bis zur Hochzeit am 14. Mai 2027`}
      </span>

      {units.map((unit, index) => (
        <div
          key={unit.key}
          aria-hidden="true"
          className={cn(
            "flex min-w-[4.5rem] flex-col items-center gap-1 px-3 xs:min-w-24 xs:px-4",
            index > 0 && "border-l border-border",
          )}
        >
          <span
            suppressHydrationWarning
            className="font-instrument-serif text-4xl leading-none text-foreground tabular-nums xs:text-5xl"
          >
            {pad(unit.value)}
          </span>
          <span className="text-sm text-foreground/70">
            {unitLabel(unit.key, unit.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
