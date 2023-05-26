'use strict'

import { object, oneOf, string } from 'sito'
import Document from '../../../models/document.js'

const validationSchema = object({
  type        : oneOf(Object.values(Document.Type)),
  id          : string(),
  textContains: string().max(100),
})

export async function getList(payload, userId) {
  await validationSchema.assert(payload)

  return new Document().find({
    where: {
      ownerId     : userId,
      type        : payload.type,
      id          : payload.id,
      textContains: payload.textContains,
    },
  })
}