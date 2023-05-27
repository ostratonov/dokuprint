'use strict'

import getUpdateTaskStatusesJob from '../timers/update-task-statuses'

export default fastify => {
  fastify.scheduler.addSimpleIntervalJob(getUpdateTaskStatusesJob())
}