'use client'

import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

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

export const DEFAULT_TIME_ZONE = 'Europe/Berlin'

/** Offset (ms) of `timeZone` from UTC at the given instant, DST-aware. */
function getTimeZoneOffsetMs(instantMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).formatToParts(instantMs)
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value)

  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return asUtc - Math.floor(instantMs / 1000) * 1000
}

/**
 * Resolves a countdown target into a timestamp.
 *
 * Plain date-strings ("2027-05-14") are parsed as midnight in `timeZone`, so
 * the server and every viewer count down to the same instant regardless of
 * their own timezone.
 */
function resolveTargetMs(target: string | Date | number, timeZone: string): number {
  if (typeof target === 'string' && DATE_STRING_PATTERN.test(target)) {
    const [year, month, day] = target.split('-').map(Number)
    const wallClockAsUtc = Date.UTC(year, month - 1, day)
    // Re-check the offset at the first result in case a DST change falls
    // between the guess and the real instant.
    const firstGuess = wallClockAsUtc - getTimeZoneOffsetMs(wallClockAsUtc, timeZone)
    return wallClockAsUtc - getTimeZoneOffsetMs(firstGuess, timeZone)
  }
  return new Date(target).getTime()
}

function subscribeToSecondTicks(onTick: () => void) {
  const interval = setInterval(onTick, 1000)
  return () => clearInterval(interval)
}

function getNowSnapshot() {
  return Math.floor(Date.now() / 1000) * 1000
}

/**
 * Ticks down to a target date and returns the remaining time broken into
 * days/hours/minutes/seconds. Safe for SSR: the first render always reflects
 * the initial target/now so there is no hydration mismatch.
 */
export function useCountdown(
  target: string | Date | number,
  options?: { onComplete?: () => void; timeZone?: string },
) {
  const timeZone = options?.timeZone ?? DEFAULT_TIME_ZONE
  const targetMs = useMemo(() => resolveTargetMs(target, timeZone), [target, timeZone])
  const onCompleteRef = useRef(options?.onComplete)
  const firedRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = options?.onComplete
  })

  // Whole-second snapshots keep the value stable between ticks, and React
  // re-syncs to the client value right after hydration.
  const now = useSyncExternalStore(subscribeToSecondTicks, getNowSnapshot, getNowSnapshot)

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
