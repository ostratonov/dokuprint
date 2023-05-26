'use strict'

import { object, string } from 'sito'
import login from '../../users/login'

const validationSchema = object({
  username: string().notEmpty().required(),
  password: string().notEmpty().required(),
}).required()

export async function loginUser(fjwt, data) {
  await validationSchema.assert(data)

  return login(fjwt, data)
}