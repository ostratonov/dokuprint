import cloneDeep from 'lodash'

export const isObject = obj => obj === Object(obj)

export const get = (object, path) => {
  path = Array.isArray(path) ? path : path.split('.')

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }

  return (index && index === length) ? object : undefined
}

export const property = path => object => get(object, path)

export const deepMerge = (target, source) => {
  const _target = cloneDeep(target)
  const _source = cloneDeep(source)

  for (const key of Object.keys(_source)) {
    if (_source[key] instanceof Object && key in _target) {
      Object.assign(_source[key], deepMerge(_target[key], _source[key]))
    }
  }

  Object.assign(_target || {}, _source)

  return _target
}

/**
 * The opposite of `pick` this method creates an object composed of the own and inherited enumerable
 * properties of `object` that are not omitted
 *
 * @param {Object} object
 * @param {String[]} props The properties to omit
 * @returns {Object}
 */
export const omit = (object, props) => {
  return omitBy(object, (value, prop) => props.includes(prop))
}

/**
 * This method creates an object composed of the own and inherited enumerable string keyed properties
 * of object that predicate doesn't return truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param {Object} object
 * @param {Function} predicate
 * @returns {Object}
 */
export const omitBy = (
  object,
  predicate = predicates.isNil,
) => {
  const result = {}

  for (const prop in object) {
    if (!predicate(object[prop], prop)) {
      result[prop] = object[prop]
    }
  }

  return result
}

export const predicates = {
  isUndefined: value => value === undefined,
  isNil: value => value == null,
  isPrimitive: value => value !== Object(value),
}