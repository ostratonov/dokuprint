'use strict'

import { object, oneOf, string } from 'sito'
import { createUser } from '../../users/create'
import User from '../../../models/user.js'

const validationSchema = object({
  username: string().required(),
  password: string().required().notEmpty(),
  role    : oneOf(Object.values(User.Roles)).required(),
}).required()

export async function register(data) {
  await validationSchema.assert(data)

  return createUser(data)
}