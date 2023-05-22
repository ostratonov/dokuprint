export const pause = ms => new Promise(resolve => {
  setTimeout(resolve, ms)
})

const DEFAULT_TIMEOUT = 20000

export const waitFor = async (probe, isDone, timeout = DEFAULT_TIMEOUT) => {
  const start = new Date().getTime()
  let result

  while (true) {
    result = await probe()

    const waitTime = new Date().getTime() - start

    if (isDone(result)) {
      break
    }

    if (waitTime > timeout) {
      throw new Error('Timeout occurred in waitFor statement')
    }

    await pause(2500)
  }

  return result
}