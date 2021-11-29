import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeDbAddAccount } from '@/main/factories/usecases/signup/signup-usecase-factory'
import { makeLogErrorDecorator } from '../../decorators/log-error-decoratory-factory'
import { makeSignUpValidation } from '../../validations/signup/signup-controller-validation'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(makeDbAddAccount(), makeSignUpValidation())
  return makeLogErrorDecorator(signupController)
}
