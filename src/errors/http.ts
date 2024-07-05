export const badRequest = (message: string) => ({
  statusCode: 400,
  message,
})

export const internalServerError = (message: string) => ({
  statusCode: 500,
  message,
})
