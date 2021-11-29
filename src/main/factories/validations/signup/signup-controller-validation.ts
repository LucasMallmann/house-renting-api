import { SignupControllerValidation } from '@/infra/validation/controllers'
import { Validation } from '@/presentation/protocols/validation'

export const makeSignUpValidation = (): Validation => {
  return new SignupControllerValidation()
}
