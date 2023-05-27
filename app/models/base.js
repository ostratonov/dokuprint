'use strict'

import Finder from './finder'
import Manager from './manager.js'
import { SystemProps } from '../constants.js'

export default class Base {
  constructor(data = {}) {
    Object.assign(this, data)
  }

  find(query) {
    return Finder.create(this, query).find()
  }

  findOne(query, { direct = false } = {}) {
    return Finder.create(this, query, direct).pickOne()
  }

  create() {
    return new Manager(this).create()
  }

  toClientShape() {
    for (const prop of SystemProps) {
      delete this[prop]
    }
  }

  remove() {
    return new Manager(this).remove()
  }

  save() {
    return new Manager(this).save()
  }
}