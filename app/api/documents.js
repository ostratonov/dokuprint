'use strict'

export default {
  prefix: '/documents',

  register(router) {
    router.get('/', (req, res) => {
      return res.send({ message: 'Hello from docs!' })
    })
  },

}