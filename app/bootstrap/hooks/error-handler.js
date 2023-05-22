import { APIError, InternalServerError } from '../../errors'
import logger from '../../utils/logger'

export default error => {
  if (!(error instanceof APIError)) {
    error = new InternalServerError(error.stack)
  }

  logger.error(`${error.name}: ${error.message}`)

  return error.toJSON()
}