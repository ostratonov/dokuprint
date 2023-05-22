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

export const predicates = {
  isUndefined: value => value === undefined,
  isString   : value => typeof value === 'string',
  isNil      : value => value == null,
  isPrimitive: value => value !== Object(value),
}