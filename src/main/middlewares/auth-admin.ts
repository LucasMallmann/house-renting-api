import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '../factories/middlewares/authentication-middleware-factory'

export const authAdmin = adaptMiddleware(makeAuthenticationMiddleware('admin'))
