'use strict'

import Base from './base.js'

const Type = {
  invoice: 'invoice',
}

export default class Document extends Base {
  constructor(args) {
    super(args)
  }

  toClientShape() {
    return this
  }
}

Document.Type = Type