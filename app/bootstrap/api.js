import fs from 'fs'
import pathUtils from 'path'
import { getDirname } from '../utils/path'

const resolvePath = path => pathUtils.resolve(getDirname(import.meta.url), path)

export default async fastify => {
  const apiFiles = await fs.promises.readdir(resolvePath('../api'))

  for (const filename of apiFiles) {
    const { default: route } = await import(resolvePath(`../api/${filename}`))

    fastify.register((router, opts, done) => {
      route.register(router)

      done()
    }, { prefix: route.prefix })
  }
}