'use strict'

import { hashPassword } from '../../utils/hash.js'
import User from '../../models/user.js'

export function createUser(data) {
  const { password } = data

  const { salt, hash } = hashPassword(password)

  return new User({
    ...data,
    salt,
    password: hash,
  }).create()
}