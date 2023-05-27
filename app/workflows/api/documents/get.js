'use strict'

import Document from '../../../models/document.js'
import { notFoundAssert } from '../../../errors'

export async function getDocument(userId, documentId) {
  const document = await new Document().findOne({
    where: { objectId: documentId, ownerId: userId },
    props: {
      objectId : true,
      ownerId  : true,
      type     : true,
      body     : true,
      extra    : true,
      created: true,
      updated: true,

      changeLogs: {
        select: {
          type   : true,
          changes: true,
        },
      },
    },
  })

  notFoundAssert(document, 'Document not found or you do not have access to it')

  return document
}