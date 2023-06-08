'use strict'

import User from '../../models/user.js'
import { verifyPassword } from '../../utils/hash.js'
import { UnathorisedError } from '../../errors.js'
import _ from 'lodash'

export async function login(fjwt, data) {
  const { username, password } = data

  const user = await new User().findOne({
    where: { username },
    props: {
      objectId: true,
      salt    : true,
      password: true,
      role    : true,
    },
  }, { direct: true })

  if (_.isEmpty(user)) {
    throw new UnathorisedError('User not found')
  }

  if (verifyPassword(password, user.salt, user.password)) {
    const token = await fjwt.sign({ username, objectId: user.objectId, role: user.role }, process.env.JWT_SECRET)

    return { token }
  }

  throw new UnathorisedError('Invalid password')
}