import { intervalToDuration } from 'date-fns'

export default function secondsToTimestamp (seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1_000 })
  return [
    duration.hours ?? 0,
    duration.minutes ?? 0,
    duration.seconds ?? 0
  ].map((n) => n.toString().padStart(2, '0')).join(':')
}
