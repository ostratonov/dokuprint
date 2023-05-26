'use strict'

import User from '../../models/user.js'
import { verifyPassword } from '../../utils/hash.js'
import { UnathorisedError } from '../../errors.js'

export async function login(fjwt, data) {
  const { username, password } = data

  const user = await new User().findOne({
    where: { username },
    props: {
      objectId: true,
      salt    : true,
      password: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (verifyPassword(password, user.salt, user.password)) {
    const token = await fjwt.sign({ username, objectId: user.objectId }, process.env.JWT_SECRET)

    return { token }
  }

  throw new UnathorisedError('Invalid password')
}