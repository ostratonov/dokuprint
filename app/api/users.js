'use strict'

import { registerUser } from '../workflows/api/users/create'
import { loginUser } from '../workflows/api/users/login'
import { get } from '../workflows/api/users/get'
import { schema } from '../utils/fastify'

export default {
  prefix: '/users',
  register(router) {
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

    router.put('/', {
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

    router.post('/register', req => {
      return registerUser(req.body)
    })

    router.post('/login', req => {
      return loginUser(router.jwt, req.body)
    })
  },
}