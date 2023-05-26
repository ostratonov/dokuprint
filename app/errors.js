export class APIError extends Error {
  constructor(message, status) {
    super()

    this.message = message
    this.name = this.constructor.name
    this.status = status
  }

  toJSON() {
    return {
      message: this.message,
      name   : this.name,
      status : this.status,
    }
  }
}

export class InternalServerError extends APIError {
  constructor(message) {
    super(message, 500)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      message: 'Internal Server Error',
    }
  }
}

export class ValidationError extends APIError {
  constructor(message) {
    super(message, 400)
  }
}

export class NotFoundError extends APIError {
  constructor(message) {
    super(message, 404)
  }
}

export class UnathorisedError extends APIError {
  constructor(message) {
    super(message, 401)
  }
}

export const argumentsAssert = (value, message) => {
  if (!value) {
    throw new ValidationError(message)
  }
}

export const notFoundAssert = (value, message) => {
  if (!value) {
    throw new NotFoundError(message)
  }
}