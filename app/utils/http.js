import http from 'http'
import https from 'https'

export const getStream = url => new Promise(resolve => {
  const agent = url.includes('https') ? https : http

  return agent.get(url, resolve)
})