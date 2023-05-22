import crypto from 'crypto'

export const md5Hash = (value, encoding = 'hex') => crypto.createHash('md5').update(value).digest(encoding)
