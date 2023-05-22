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

export const predicates = {
  odd : (elem, i) => i % 2 === 1,
  even: (elem, i) => i % 2 === 0,
}

export const compact = arr => arr.filter(item => !!item)