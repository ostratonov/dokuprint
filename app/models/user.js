'use strict'

import Base from './base.js'
import { omit } from '../utils/object.js'

const Roles = {
  Admin: 'admin',
  User : 'user',
}

export default class User extends Base {
  constructor(args) {
    super(args)
  }

  toClientShape() {
    return omit(this, ['password', 'salt'])
  }
}

User.Roles = Roles
