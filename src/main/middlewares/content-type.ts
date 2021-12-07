import { NextFunction, Response } from 'express'

export const contentType = (_, response: Response, next: NextFunction) => {
  response.type('json')
  return next()
}
