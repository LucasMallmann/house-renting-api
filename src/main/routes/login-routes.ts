import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeSigninController } from '../factories/controllers/signin/signin-controller-factory'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/signin', adaptRoute(makeSigninController()))
}
