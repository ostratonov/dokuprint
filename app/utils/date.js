export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60

export const parse = date => new Date(isNaN(date) ? date : Number(date))