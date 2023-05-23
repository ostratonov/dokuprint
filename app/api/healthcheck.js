'use strict'

export default {
  prefix: '/healthcheck',

  register(router) {
    router.get('/', () => {
      return { status: 'OK' }
    })
  },
}