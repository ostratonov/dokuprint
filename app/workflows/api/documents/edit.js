'use strict'

import Document from '../../../models/document.js'
import { notFoundAssert } from '../../../errors'
import { diff } from '../../../utils/object'
import _ from 'lodash'
import { createChangeLog } from '../../changelog/create.js'

function getChanges(document, payload) {
  return diff(payload, document, Object.keys(payload))
}

export async function editDocument(userId, documentId, payload) {
  const document = await new Document().findOne({ where: { objectId: documentId, ownerId: userId } })

  notFoundAssert(document, 'Document not found or you do not have access to it')

  const prevDocument = _.cloneDeep(document)

  const changes = getChanges(document, payload)

  if (!Object.keys(changes).length) {
    return document
  }

  Object.assign(document, payload)

  await document.save()

  await createChangeLog(document, prevDocument, Object.keys(changes), 'update')

  return document
}