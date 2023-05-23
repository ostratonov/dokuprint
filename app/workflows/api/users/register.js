'use strict'

import prisma from '../../../utils/prisma'
import { hashPassword } from '../../../utils/hash.js'
import { object, string } from 'sito'

const validationSchema = object({
  username: string().required(),
  password: string().required().notEmpty(),
  role    : string().required(),
}).required()

export async function registerUser(data) {
  await validationSchema.assert(data)

  const { password } = data

  const { salt, hash } = hashPassword(password)

  const user = await prisma.user.create({
    data: { ...data, salt, password: hash },
  })

  return user
}