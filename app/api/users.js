'use strict'

import { registerUser } from '../workflows/api/users/register'

export default {
  prefix: '/users',
  register(router) {
    router.get('/register', (req, res) => {
      return registerUser(req.body)
    })
  },

}