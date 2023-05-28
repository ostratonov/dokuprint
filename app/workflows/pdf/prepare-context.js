'use strict'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const resolveAddresses = (document, context) => {
  const { from, to } = document

  context.fromName = from?.name
  context.fromAddress = from?.address

  context.toName = to?.name
  context.toAddress = to?.address
}

export function prepareContext(document, options) {
  const context = {
    ...document,
  }

  context.logo = 'main'
  context.background = 'main-colorless'

  context.assetsPath = path.resolve(__dirname, './assets')

  resolveAddresses(document, context)

  return context
}