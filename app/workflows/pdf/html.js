'use strict'

import path, { dirname } from 'path'
import Handlebars from 'handlebars/dist/handlebars.runtime'
import df from 'dateformat'
import { round } from '../../utils/number'
import { fileURLToPath } from 'url'
import assert from 'assert'
import headPartial from './assets/templates/partials/head.hbs.js'
import mainPartial from './assets/templates/partials/main.hbs.js'
import logoPartial from './assets/templates/partials/logo.hbs.js'
import invoice from './assets/templates/invoice.hbs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TemplateStylesMap = {
  invoice: 'invoice',
}

const TemplateMap = {
  invoice: invoice,
}

const getHandlebars = () => {
  Handlebars.registerHelper({
    dashIfNull: value => {
      return value == null ? '-' : value
    },

    formatNumber: value => {
      const rounded = round(value)

      return String(rounded).replace('.', ',')
    },

    sequenceCounter: value => value + 1,

    formatDate: (date, mask) => df(date, mask),

    setVariable: (variable, value, options) => {
      options.data.root[variable] = value
    },

    repeat(n, block) {
      let result = ''

      n = n || 1

      for (let i = 0; i < n; ++i) {
        result += block.fn(this)
      }

      return result
    },
  })

  Handlebars.registerPartial('head', Handlebars.template(headPartial))
  Handlebars.registerPartial('main', Handlebars.template(mainPartial))
  Handlebars.registerPartial('logo', Handlebars.template(logoPartial))

  return Handlebars
}

export function createDocHTML(document, options = {}) {
  const templateName = options.template

  assert(TemplateStylesMap[templateName], `Template ${templateName} not found`)

  const template = TemplateMap[templateName]

  const handlebarsTemplate = getHandlebars().template(template)

  return handlebarsTemplate({
    assetsPath: path.resolve(__dirname, './assets'),
    items     : [document],
    copies    : 1,
    stylesheet: TemplateStylesMap[templateName],
  })
}