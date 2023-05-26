'use strict'

import Finder from './finder'
import Manager from './manager.js'

export default class Base {
  constructor(data = {}) {
    this.__name = this.constructor.name.toLowerCase()

    Object.assign(this, data)
  }

  find(query) {
    return Finder.create(this, query).find()
  }

  findOne(query) {
    return Finder.create(this, query).pickOne()
  }

  create() {
    return new Manager(this).create()
  }

  toClientShape() {
    throw new Error('this method must be implemented in child class')
  }

  remove() {
    return new new Manager(this).remove()
  }
}