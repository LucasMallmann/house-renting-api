import { NextFunction, Response } from 'express'

export const cors = (_, response: Response, next: NextFunction): void => {
  response.set('access-control-allow-origin', '*')
  response.set('access-control-allow-methods', '*')
  response.set('access-control-allow-headers', '*')

  return next()
}
