'use strict'

import DocumentTask from '../../../models/document-task.js'
import { date, object, string } from 'sito'
import { addDays } from '../../../utils/date'

const validationSchema = object({
  body      : object(),
  expiresAt : date().inFuture(),
  documentId: string().required(),
  status    : string().required(),
}).required()

export async function createTask(ownerId, documentId, payload) {
  await validationSchema.assert(payload)

  return new DocumentTask({
    ...payload,
    expiresAt: payload.expiresAt || addDays(new Date(), 7),
    ownerId,
    document : {
      connect: { objectId: documentId },
    },
  }).create()
}