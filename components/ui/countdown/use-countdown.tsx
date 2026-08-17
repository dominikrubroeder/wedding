'use client'

import { useEffect, useRef, useState } from 'react';

export interface CountdownTimeParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** Total milliseconds remaining, floored at 0. */
  totalMs: number
  /** True once the target date has been reached or passed. */
  isComplete: boolean
}

function getTimeParts(msRemaining: number): CountdownTimeParts {
  const totalMs = Math.max(0, msRemaining)
  const totalSeconds = Math.floor(totalMs / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: Math.floor(totalSeconds % 60),
    totalMs,
    isComplete: totalMs <= 0,
  }
}

/** Matches a plain date-string like "2027-05-14" (no time/timezone). */
const DATE_STRING_PATTERN = /^\d{4}-\d{2}-\d{2}$/

/**
 * Resolves a countdown target into a timestamp.
 *
 * Plain date-strings ("2027-05-14") are parsed as local midnight, since
 * passing them straight to `new Date()` treats them as UTC and can display
 * as the wrong day depending on the viewer's timezone.
 */
function resolveTargetMs(target: string | Date | number): number {
  if (typeof target === 'string' && DATE_STRING_PATTERN.test(target)) {
    const [year, month, day] = target.split('-').map(Number)
    return new Date(year, month - 1, day).getTime()
  }
  return new Date(target).getTime()
}

/**
 * Ticks down to a target date and returns the remaining time broken into
 * days/hours/minutes/seconds. Safe for SSR: the first render always reflects
 * the initial target/now so there is no hydration mismatch.
 */
export function useCountdown(target: string | Date | number, options?: { onComplete?: () => void }) {
  const targetMs = resolveTargetMs(target)
  const onCompleteRef = useRef(options?.onComplete)
  onCompleteRef.current = options?.onComplete

  const [now, setNow] = useState(() => Date.now())
  const firedRef = useRef(false)

  useEffect(() => {
    // Re-sync immediately in case time passed between initial render and mount.
    setNow(Date.now())

    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeParts = getTimeParts(targetMs - now)

  useEffect(() => {
    if (timeParts.isComplete && !firedRef.current) {
      firedRef.current = true
      onCompleteRef.current?.()
    }
    if (!timeParts.isComplete) {
      firedRef.current = false
    }
  }, [timeParts.isComplete])

  return timeParts
}
