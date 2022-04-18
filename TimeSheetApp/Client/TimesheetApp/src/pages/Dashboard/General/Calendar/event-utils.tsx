import { EventInput } from '@fullcalendar/react'

let eventGuid = 0

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: todayStr
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00'
//   }
// ]

export function createEventId() {
  return String(eventGuid++)
}
