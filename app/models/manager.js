'use strict'

import { omit } from '../utils/object'
import { SystemProps } from '../constants.js'
import prisma from '../utils/prisma.js'
import assert from 'assert'

export default class Manager {
  #model
  #options

  constructor(model, options) {
    this.#model = model
    this.#options = options
  }

  async create() {
    const model = await prisma[this.#model.__name].create({ data: omit(this.#model, SystemProps) })

    return new this.#model.constructor(model)
      .toClientShape()
  }

  async save() {
    assert(this.#model.objectId, 'objectId is required')

    const model = await prisma[this.#model.__name].update({
      where: { objectId: this.#model.objectId },
      data : omit(this.#model, SystemProps),
    })

    return new this.#model.constructor(model)
      .toClientShape()
  }

  remove() {

  }
}