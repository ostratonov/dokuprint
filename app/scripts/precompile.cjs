'use strict'

const Handlebars = require('handlebars')
const fs = require('fs').promises
const path = require('path')

const TEMPLATES_DIRS = [
  path.resolve(__dirname, '../workflows/pdf/assets/templates'),
  path.resolve(__dirname, '../workflows/pdf/assets/templates/partials'),
]

const precompileTemplate = async filePath => {
  console.log('  ', filePath)

  const template = await fs.readFile(filePath, 'utf8')

  return fs.writeFile(filePath + '.js', `export default ${Handlebars.precompile(template)}`)
}

const processDir = async dirPath => {
  console.log('Templates Dir: ', dirPath)

  const files = await fs.readdir(dirPath)

  await Promise.all(files.map(async file => {
    const filePath = path.resolve(dirPath, file)

    if ((await fs.stat(filePath)).isDirectory()) {
      await processDir(filePath)
    } else if (filePath.endsWith('.hbs')) {
      await precompileTemplate(filePath)
    }
  }))
}

TEMPLATES_DIRS.map(processDir)