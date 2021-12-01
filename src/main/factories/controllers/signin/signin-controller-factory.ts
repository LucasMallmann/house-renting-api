import { Controller } from '@/presentation/protocols/controller'
import { makeLogErrorDecorator } from '../../decorators/log-error-decoratory-factory'
import { SigninController } from '@/presentation/controllers/login/signin/signin-controller'
import { makeDbAuthentication } from '../../usecases/authentication/authentication-usecase-factory'
import { makeSigninControllerValidation } from '../../validations/signin/signin-controller-validation'

export const makeSigninController = (): Controller => {
  const signInValidation = makeSigninControllerValidation()
  const dbAuthentication = makeDbAuthentication()
  const signinController = new SigninController(signInValidation, dbAuthentication)
  return makeLogErrorDecorator(signinController)
}
