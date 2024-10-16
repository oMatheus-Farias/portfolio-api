export const badRequest = (message: string) => ({
  statusCode: 400,
  body: {
    message,
  },
})

export const unauthorized = (message: string) => ({
  statusCode: 401,
  body: {
    message,
  },
})

export const notFound = (message: string) => ({
  statusCode: 404,
  body: {
    message,
  },
})

export const conflict = (message: string) => ({
  statusCode: 409,
  body: {
    message,
  },
})

export const internalServerError = (message: string) => ({
  statusCode: 500,
  body: {
    message,
  },
})
