'use strict'

import Document from '../../models/document.js'
import { argumentsAssert } from '../../errors.js'
import { createDocHTML } from './html.js'
import { prepareContext } from './prepare-context'
import pdf from './pdf.js'
import { object, string } from 'sito'

function fetch(documentId) {
  return new Document().findOne({
    where: {
      objectId: documentId,
    },
  })
}

const validationSchema = object({
  template: string().notEmpty().required(),
}).required()

export async function printDocument(ownerId, documentId, options) {
  await validationSchema.assert(options)

  const document = await fetch(documentId)

  argumentsAssert(document.ownerId === ownerId, 'You do not have rights to print this document')

  const context = prepareContext(document, options)

  const html = await createDocHTML(context, options)

  const { stream, filePath } = await pdf(html, options)

  return { stream, filePath }
}