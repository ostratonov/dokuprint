'use strict'

import User from '../../../models/user.js'
import { notFoundAssert } from '../../../errors.js'

export async function edit(userId, payload) {
  const user = await new User().findOne({ where : { objectId: userId } })

  notFoundAssert(user)

  Object.assign(user, payload)

  return user.save()
}