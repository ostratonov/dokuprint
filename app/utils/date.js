'use strict'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const isLeapYear = year =>
  ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)

const getDaysInMonth = (year, month) =>
  [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

export const addSeconds = (date, seconds) => new Date(new Date(date).getTime() + (seconds * SECOND))

export const addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * MINUTE))

export const addHours = (date, hours) => new Date(new Date(date).getTime() + (hours * HOUR))

export const addDays = (date, days) => new Date(new Date(date).getTime() + (days * DAY))

export const addMonths = (date, months) => {
  date = new Date(date)

  const n = date.getDate()

  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(n, getDaysInMonth(date.getFullYear(), date.getMonth())))

  return date
}

/**
 * @param {Date|String|Number} date
 * @param {Number} offset
 * @returns {Date}
 */
const setTimezoneOffset = (date, offset) => {
  const targetDate = new Date(date)
  const diff = offset + targetDate.getTimezoneOffset()

  return addMinutes(targetDate, diff)
}

export const getGSTDate = date => {
  date = new Date(date)

  return setTimezoneOffset(date, 4 * 60)
}

export const parse = date => new Date(isNaN(date) ? date : Number(date))
export const isValidDate = date => parse(date).toString() !== 'Invalid Date'