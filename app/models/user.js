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

  static isAllowedToCreateDocument(type, role) {
    if (role === Roles.Admin) {
      return true
    }

    if (type === 'invoice') {
      return false
    }
  }

  toClientShape() {
    return omit(this, ['password', 'salt'])
  }
}

User.Roles = Roles
