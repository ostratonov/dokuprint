'use strict'

import Base from './base.js'

export default class DocumentChangeLog extends Base {
  constructor(args) {
    super(args)
  }

  toClientShape() {
    return this
  }
}