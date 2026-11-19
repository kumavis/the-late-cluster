import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isoWeekWindow, parseIsoWeek, lastCompleteWeek, rollingWindow, previousWeekLabels, isoWeekOf, weekLabel, weeksInIsoYear, resolveWindow } from '../src/window.js'

const d = (s) => Date.parse(s)

test('ISO week 1 can start in the previous calendar year', () => {
  const w = isoWeekWindow('2026-W01')
  assert.equal(new Date(w.start).toISOString(), '2025-12-29T00:00:00.000Z')
  assert.equal(w.end - w.start, 7 * 86_400_000)
})

test('2026-W47 is Monday 16 Nov to Monday 23 Nov, end exclusive', () => {
  const w = isoWeekWindow('2026-W47')
  assert.equal(new Date(w.start).toISOString(), '2026-11-16T00:00:00.000Z')
  assert.equal(new Date(w.end).toISOString(), '2026-11-23T00:00:00.000Z')
  assert.equal(w.label, '2026-W47')
})

test('53-week years and their boundaries', () => {
  assert.equal(weeksInIsoYear(2026), 53)
  assert.equal(weeksInIsoYear(2027), 52)
  assert.throws(() => parseIsoWeek('2027-W53'), /no week 53/)
  assert.deepEqual(isoWeekOf(d('2027-01-01T12:00:00Z')), { year: 2026, week: 53 })
  assert.deepEqual(isoWeekOf(d('2027-01-04T00:00:00Z')), { year: 2027, week: 1 })
})

test('week labels parse loosely and print strictly', () => {
  assert.deepEqual(parseIsoWeek('2026w7'), { year: 2026, week: 7 })
  assert.equal(weekLabel({ year: 2026, week: 7 }), '2026-W07')
  assert.throws(() => parseIsoWeek('2026-47'), /not an ISO week/)
})

test('default window is the most recent complete week', () => {
  assert.equal(lastCompleteWeek(d('2026-11-19T07:00:00Z')).label, '2026-W46')
  // Monday midnight: the week that just ended is complete.
  assert.equal(lastCompleteWeek(d('2026-11-16T00:00:00Z')).label, '2026-W46')
  assert.equal(lastCompleteWeek(d('2026-11-15T23:59:59Z')).label, '2026-W45')
  assert.equal(lastCompleteWeek(d('2027-01-06T10:00:00Z')).label, '2026-W53')
})

test('rolling window ends now and is n days long', () => {
  const now = d('2026-11-19T07:30:00.500Z')
  const w = rollingWindow(7, now)
  assert.equal(new Date(w.end).toISOString(), '2026-11-19T07:30:00.000Z')
  assert.equal(new Date(w.start).toISOString(), '2026-11-12T07:30:00.000Z')
  assert.equal(w.label, 'last-7d-2026-11-19')
  assert.throws(() => rollingWindow(0, now))
  assert.throws(() => resolveWindow({ week: '2026-W46', days: 7 }), /either/)
})

test('previous week labels cross year boundaries', () => {
  assert.deepEqual(previousWeekLabels(isoWeekWindow('2027-W02'), 3), ['2027-W01', '2026-W53', '2026-W52'])
})
