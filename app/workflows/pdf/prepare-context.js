'use strict'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function prepareContext(document, options) {
  const context = {
    ...document,
  }

  context.logo = 'main'
  context.background = 'main'

  context.assetsPath = path.resolve(__dirname, './assets')

  return context
}