"use client";

import { cn } from "@/lib/utils";
import { useCountdown } from "@/components/ui/countdown/use-countdown";

export interface CountdownProps {
  /**
   * The date/time to count down to. Accepts a plain date-string like
   * "2027-05-14" (parsed as local midnight), any ISO string, a Date, or a
   * timestamp.
   */
  target: string | Date | number;
  /** Called once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Content shown once the countdown has completed, in place of the units. */
  completedContent?: React.ReactNode;
  /** Hide a unit entirely (still counted internally, just not rendered). */
  hideUnits?: Array<"days" | "hours" | "minutes" | "seconds">;
  className?: string;
}

const UNIT_LABELS = {
  days: "Tage",
  hours: "Stunden",
  minutes: "Minuten",
  seconds: "Sekunden",
} as const;

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function Countdown({
  target,
  onComplete,
  completedContent,
  hideUnits = [],
  className,
}: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(target, {
    onComplete,
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
      aria-live="polite"
      aria-atomic="true"
      className={cn("relative z-10 flex items-center gap-3", className)}
    >
      {/* This value legitimately differs by a second between the server render
          and client hydration for a live-ticking countdown, so we suppress
          the (expected) hydration warning rather than the underlying value. */}
      <span className="sr-only" suppressHydrationWarning>
        {isComplete
          ? "Countdown complete"
          : `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
      </span>

      {units.map((unit, index) => (
        <div key={unit.key} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div
              suppressHydrationWarning
              className="flex h-11 w-14 items-center justify-center rounded-lg border border-border bg-background font-mono text-lg font-semibold text-foreground tabular-nums"
            >
              {pad(unit.value)}
            </div>

            <span className="text-sm">{UNIT_LABELS[unit.key]}</span>
          </div>

          {index < units.length - 1 && (
            <span aria-hidden="true" className="pb-5 text-xl font-semibold">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
