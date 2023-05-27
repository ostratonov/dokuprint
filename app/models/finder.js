'use strict'

import prisma from '../utils/prisma.js'
import { omitBy } from '../utils/object.js'
import _ from 'lodash'

export default class Finder {
  #model
  #options
  #direct

  #resolveModelName() {
    return _.camelCase(this.#model.constructor.name)
  }

  constructor(model, options, direct) {
    this.#model = model
    this.#options = options
    this.#direct = direct
  }

  static create(model, options, direct) {
    return new Finder(model, options, direct)
  }

  async find() {
    const models = await prisma[this.#resolveModelName()].findMany({
      where: this.#options.where,
      skip : this.#options.skip,
      take : this.#options.take,
    })

    return models.map(m => {
      const constr = new this.#model.constructor(m)

      if (this.#direct) {
        return constr
      }

      return constr.toClientShape()
    })
  }

  async pickOne() {
    const model = await prisma[this.#resolveModelName()].findFirst(omitBy({
      where  : this.#options.where,
      include: this.#options.include,
      select : this.#options.props,
    }))

    const constr = new this.#model.constructor(model)

    if (this.#direct) {
      return constr
    }

    return constr.toClientShape()
  }
}