'use strict'

import { omit } from '../utils/object'
import { SystemProps } from '../constants.js'
import prisma from '../utils/prisma.js'

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

  remove() {

  }
}