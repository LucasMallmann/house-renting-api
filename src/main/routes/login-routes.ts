import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}