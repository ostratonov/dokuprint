'use strict'

import DocumentTask from '../../models/document-task.js'

export default async () => {
  const tasks = await new DocumentTask().find({
    where: {
      expiresAt: {
        lte: new Date(),
      },
      status   : { notIn: [DocumentTask.Status.EXPIRED, DocumentTask.Status.DONE] },
    },
  })

  for (const task of tasks) {
    task.status = DocumentTask.Status.EXPIRED

    await task.save()
  }

  return tasks.length
}