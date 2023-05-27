'use strict'

import { omit } from '../utils/object'
import _ from 'lodash'
import { SystemProps } from '../constants.js'
import prisma from '../utils/prisma.js'
import assert from 'assert'

export default class Manager {
  #model
  #options

  #resolveModelName() {
    return _.camelCase(this.#model.constructor.name)
  }

  constructor(model, options) {
    this.#model = model
    this.#options = options
  }

  async create() {
    const model = await prisma[this.#resolveModelName()].create({ data: omit(this.#model, SystemProps) })

    return new this.#model.constructor(model)
      .toClientShape()
  }

  async save() {
    assert(this.#model.objectId, 'objectId is required')

    const model = await prisma[this.#resolveModelName()].update({
      where: { objectId: this.#model.objectId },
      data : omit(this.#model, SystemProps),
    })

    return new this.#model.constructor(model)
      .toClientShape()
  }

  async remove() {
    const model = await prisma[this.#resolveModelName()].delete({
      where: { objectId: this.#model.objectId },
    })

    return new this.#model.constructor(model)
      .toClientShape()
  }
}