import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbAddAccount } from '@/main/factories/usecases/signup/signup-usecase-factory'
import { makeLogErrorDecorator } from '../../decorators/log-error-decoratory-factory'

const makeSignUpValidation = () => {
  class FakeValidation implements Validation {
    async validate (input: any): Promise<void | Error> {
    }
  }
  return new FakeValidation()
}

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(makeDbAddAccount(), makeSignUpValidation())
  return makeLogErrorDecorator(signupController)
}
