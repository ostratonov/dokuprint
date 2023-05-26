'use strict'

import { register } from '../workflows/api/users/create'
import { login } from '../workflows/api/users/login'
import { get } from '../workflows/api/users/get'
import { edit } from '../workflows/api/users/edit'
import { schema } from '../utils/fastify'

export default {
  prefix: '/users',

  register(router) {
    /**
     * @description Returns a list of users
     */
    router.get('/', {
      onRequest: [router.authenticate],
      schema   : {
        querystring: schema({
          offset      : 'number',
          limit       : 'number',
          nameContains: 'string',
        }),
      },
    }, req => {
      return get(req.query)
    })

    /**
     * @description Edits a user
     */
    router.put('/:id', {
      onRequest: [router.authenticate],
    }, req => {
      return edit(req.params.id, req.body)
    })

    router.post('/register', req => {
      return register(req.body)
    })

    router.post('/login', req => {
      return login(router.jwt, req.body)
    })
  },
}