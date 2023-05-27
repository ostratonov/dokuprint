'use strict'

import DocumentChangeLog from '../../models/document-change-log.js'

function prepareLogData(document, prevDocument, changedAttributes) {
  const data = {}

  changedAttributes.forEach(attr => {
    if (document[attr] === prevDocument[attr]) {
      return
    }

    const value = document[attr]
    const oldValue = prevDocument[attr]

    data[attr] = { value, oldValue }
  })

  return data
}

export async function createChangeLog(document, prevDocument, changedAttributes, type) {
  const changes = prepareLogData(document, prevDocument, changedAttributes)

  await new DocumentChangeLog({
    type,
    changes,
    document: {
      connect: { objectId : document.objectId },
    },
  }).create()
}