'use strict'

import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'
import actualiseStatuses from '../workflows/tasks/actualise-status'
import logger from '../utils/logger.js'
import { fileURLToPath } from 'url'

const log = result => logger.info(`Actualised ${result} tasks`)

export default function() {
  const __filename = fileURLToPath(import.meta.url)

  const task = new AsyncTask(__filename, () => actualiseStatuses().then(log), err => logger.error(err))

  return new SimpleIntervalJob({ seconds: 10 }, task)
}