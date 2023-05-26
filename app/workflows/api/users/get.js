'use strict'

import { number, object, string } from 'sito'
import User from '../../../models/user.js'

const validationSchema = object({
  name  : string(),
  offset: number().strict(true),
  limit : number().strict(true),
})

export async function get(payload) {
  await validationSchema.assert(payload)

  return new User().find({
    skip : payload.offset,
    take : payload.limit,
    where: {
      username: {
        contains: payload.name || undefined,
      },
    },
  })
}