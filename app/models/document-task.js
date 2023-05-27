'use strict'

import Base from './base.js'

const Status = {
  PENDING: 'pending',
  DONE   : 'done',
  EXPIRED: 'expired',
}

export default class DocumentTask extends Base {
  constructor(args) {
    super(args)
  }

  toClientShape() {
    return this
  }
}

DocumentTask.Status = Status