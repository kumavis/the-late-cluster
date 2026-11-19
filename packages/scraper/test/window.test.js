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
  assert.throws(() => resolveWindow({ week: '2026-W46', days: 7 }), /only one of --week, --days and --since/)
})

test('previous week labels cross year boundaries', () => {
  assert.deepEqual(previousWeekLabels(isoWeekWindow('2027-W02'), 3), ['2027-W01', '2026-W53', '2026-W52'])
})

import { parseInstant, rangeWindow, baselineWeekLabels } from '../src/window.js'

test('--since takes a bare date as 00:00 UTC, and ISO date-times with or without an offset', () => {
  assert.equal(parseInstant('2026-11-13'), d('2026-11-13T00:00:00Z'))
  assert.equal(parseInstant('2026-11-13T18:30'), d('2026-11-13T18:30:00Z'), 'no offset means UTC')
  assert.equal(parseInstant('2026-11-13T18:30:15Z'), d('2026-11-13T18:30:15Z'))
  assert.equal(parseInstant('2026-11-13T18:30:00+02:00'), d('2026-11-13T16:30:00Z'))
  for (const bad of ['2026-02-30', '13/11/2026', '2026-11-13 18:30', 'yesterday', '', '2026-11-13T25:00Z']) {
    assert.throws(() => parseInstant(bad), /--since/, bad)
  }
})

test('a --since window runs to now (or --until), end exclusive, and is labelled by its ends', () => {
  const now = d('2026-11-19T08:31:22.700Z')
  const w = rangeWindow('2026-11-13', undefined, now)
  assert.equal(w.kind, 'range')
  assert.equal(new Date(w.start).toISOString(), '2026-11-13T00:00:00.000Z')
  assert.equal(new Date(w.end).toISOString(), '2026-11-19T08:31:22.000Z')
  assert.equal(w.label, '2026-11-13T0000Z_2026-11-19T0831Z')
  const u = rangeWindow('2026-11-13', '2026-11-16T12:00Z', now)
  assert.equal(u.end, d('2026-11-16T12:00:00Z'))
})

test('--since rules: one way to choose a window, --until needs --since, sane ends', () => {
  const now = d('2026-11-19T08:00:00Z')
  assert.throws(() => resolveWindow({ since: '2026-11-13', week: '2026-W46', now }), /only one of --week, --days and --since \(got --week and --since\)/)
  assert.throws(() => resolveWindow({ since: '2026-11-13', days: 7, now }), /only one of/)
  assert.throws(() => resolveWindow({ until: '2026-11-16', now }), /--until needs --since/)
  assert.throws(() => resolveWindow({ since: '2026-11-19T09:00Z', now }), /--until must be after --since/)
  assert.throws(() => resolveWindow({ since: '2026-11-13', until: '2026-11-12', now }), /after/)
  assert.throws(() => resolveWindow({ since: '2026-11-13', until: '2026-11-20', now }), /in the future/)
  assert.throws(() => resolveWindow({ since: '2026-08-01', now }), /at most 60 days/)
  assert.equal(resolveWindow({ since: '2026-11-13', now }).kind, 'range')
})

test('baseline weeks for any window: the ISO weeks overlapping the weeks before it', () => {
  const now = d('2026-11-19T08:00:00Z')
  // 13 Nov is a Friday in 2026-W46; the baseline (3 weeks back) reaches into W43.
  assert.deepEqual(baselineWeekLabels(rangeWindow('2026-11-13', undefined, now), 3), ['2026-W46', '2026-W45', '2026-W44', '2026-W43'])
  assert.deepEqual(baselineWeekLabels(isoWeekWindow('2026-W47'), 3), ['2026-W46', '2026-W45', '2026-W44'])
})
