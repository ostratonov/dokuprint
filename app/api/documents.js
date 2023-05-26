'use strict'

import { getList } from '../workflows/api/documents/get-list'
import { createDocument } from '../workflows/api/documents/create'
import { schema } from '../utils/fastify.js'

export default {
  prefix: '/documents',

  register(router) {
    router.get('/', {
      onRequest: [router.authenticate],
      schema   : {
        querystring: schema({
          doctype     : 'string',
          id          : 'string',
          textContains: 'string',
        }),
      },
    }, req => {
      return getList(req.query, req.user.objectId)
    })

    router.post('/', {
      onRequest: [router.authenticate],
    }, req => {
      return createDocument(req.body, req.user.objectId)
    })
  },

}