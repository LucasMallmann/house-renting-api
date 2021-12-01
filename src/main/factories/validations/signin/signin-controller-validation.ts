import { SigninControllerValidation } from '@/infra/validation/controllers'

export const makeSigninControllerValidation = (): SigninControllerValidation => {
  return new SigninControllerValidation()
}
