import { get } from './object'

export const toArray = value => Array.isArray(value) ? value : [value]

export const keyBy = (array, iteratee) => {
  const result = {}

  if (typeof iteratee === 'string') {
    const path = iteratee

    iteratee = item => get(item, path)
  }

  array.forEach((item, i) => {
    result[iteratee(item, i)] = item
  })

  return result
}

export const compact = arr => arr.filter(item => !!item)