'use strict'

import prisma from '../utils/prisma.js'
import { omitBy } from '../utils/object.js'

export default class Finder {
  #model
  #options

  constructor(model, options) {
    this.#model = model
    this.#options = options
  }

  static create(model, options) {
    return new Finder(model, options)
  }

  async find() {
    const models = await prisma[this.#model.__name].findMany({
      where: this.#options.where,
      skip : this.#options.skip,
      take : this.#options.take,
    })

    return models.map(m => new this.#model.constructor(m).toClientShape())
  }

  pickOne() {
    return prisma[this.#model.__name].findUnique(omitBy({
      where : this.#options.where,
      select: this.#options.props,
    }))
      .then(model => new this.#model.constructor(model).toClientShape())
  }
}