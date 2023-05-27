'use strict'

import { assert as schemaAssert, boolean, check, compose, object, oneOf, string } from 'sito'
import Document from '../../../models/document.js'
import User from '../../../models/user.js'

const validationSchema = user => {
  return object({
    type     : v => compose(
      oneOf(Object.values(Document.Type)),
      check({
        validate: () => User.isAllowedToCreateDocument(v, user.role),
        message : `User with role ${user.role} is not allowed to create ${v} document`,
      }),
    ),
    body     : string(),
    extra    : object(),
    protected: boolean(),
  })
}

export async function createDocument(user, payload) {
  await schemaAssert(validationSchema(user), payload)

  return new Document({
    ...payload,
    ownerId: user.objectId,
  }).create()
}