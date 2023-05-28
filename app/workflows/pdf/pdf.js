'use strict'

import wkhtmltopdf from 'wkhtmltopdf'

import { promisify } from 'util'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SINGLE_PAGE_6x4_OPTIONS = {
  disableSmartShrinking: true,
  pageWidth            : '152mm',
  pageHeight           : '101mm',
  marginLeft           : '2mm',
  marginRight          : '2mm',
  marginTop            : '3mm',
  marginBottom         : '1mm',
}

const SINGLE_PAGE_4x6_OPTIONS = {
  disableSmartShrinking: true,
  pageWidth            : '101mm',
  pageHeight           : '152mm',
  marginLeft           : '2mm',
  marginRight          : '2mm',
  marginTop            : '3mm',
  marginBottom         : '1mm',
}

const MULTI_PAGE_A4_OPTIONS = {
  disableSmartShrinking: true,
  pageSize             : 'A4',
  marginLeft           : '10mm',
  marginRight          : '10mm',
}

const PAGE_OPTIONS_BY_TEMPLATE = {
  invoice: SINGLE_PAGE_4x6_OPTIONS,
}

const getWkOptions = (template, pdfFolderPath, pdfFileName) => {
  // const options = PAGE_OPTIONS_BY_TEMPLATE[template]

  return {
    // ...options,
    debug                : true,
    enableLocalFileAccess: true,
    output               : `${pdfFolderPath}/${pdfFileName}`,
  }
}

/**
 * @typedef {Object} CreatePdfOptions
 * @property {String} template
 * @property {String} [folderPath]
 * @property {String} [filename]
 */

/**
 * @param {String} html
 * @param {CreatePdfOptions} [options]
 * @returns {Promise<buffer>}
 */
export default async (html, options = {}) => {
  const wkhtml = promisify(wkhtmltopdf)

  const folderPath = path.resolve(__dirname, '../../../content')
  const fileName = `${Date.now()}.pdf`

  const wkOptions = getWkOptions(options.template, folderPath, fileName)

  await wkhtml(html, wkOptions).catch(e => {
    throw new Error(`Unable to create AWB. ${e.stack}`)
  })

  return { stream: fs.createReadStream(`${folderPath}/${fileName}`), filePath: `${folderPath}/${fileName}` }
}