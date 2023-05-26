'use strict'

import { object, string } from 'sito'
import { login as logUser } from '../../users/login'

const validationSchema = object({
  username: string().notEmpty().required(),
  password: string().notEmpty().required(),
}).required()

export async function login(fjwt, data) {
  await validationSchema.assert(data)

  return logUser(fjwt, data)
}