import * as sito from 'sito'
import { ValidationError } from '../errors'
import { getDirname } from '../utils/path'
import { compact, predicates } from '../utils/array'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

const envFile = path.resolve(getDirname(import.meta.url), '../../.env')

const fillEnvVariables = () => {
  dotenv.config({ path: envFile })
}

const assertEnvFulfilled = () => {
  const envExample = fs.readFileSync(envFile + '.example', 'utf8')

  const VARIABLES = compact(envExample.split(/[\n=]/).filter(predicates.even))

  VARIABLES.forEach(variable => {
    if (process.env[variable] == null) {
      throw new Error(`[${variable}] environment variable is not specified`)
    }
  })
}

const registerSitoInterceptor = () => {
  sito.interceptor.onError(error => new ValidationError(error.message))
}

export default () => {
  fillEnvVariables()
  assertEnvFulfilled()
  registerSitoInterceptor()
}