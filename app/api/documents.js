'use strict'

import { getList } from '../workflows/api/documents/get-list'
import { createDocument } from '../workflows/api/documents/create'
import { getDocument } from '../workflows/api/documents/get'
import { editDocument } from '../workflows/api/documents/edit'
import { createTask } from '../workflows/api/tasks/create'

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
      return createDocument(req.user, req.body)
    })

    router.get('/:id', {
      onRequest: [router.authenticate],
    }, req => {
      return getDocument(req.user.objectId, req.params.id)
    })

    router.put('/:id', {
      onRequest: [router.authenticate],
    }, req => {
      return editDocument(req.user.objectId, req.params.id, req.body)
    })

    router.post('/:id/tasks/', {
      onRequest: [router.authenticate],
    }, req => {
      return createTask(req.user.objectId, req.params.id, req.body)
    })
  },

}