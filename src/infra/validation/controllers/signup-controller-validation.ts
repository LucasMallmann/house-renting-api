import Joi from 'joi'
import { Validation } from '@/presentation/protocols/validation'

export class SignupControllerValidation implements Validation {
  async validate (input: any): Promise<void | Error> {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.ref('password'),
        email: Joi.string().email().required(),
        role: Joi.string()
      }).with('password', 'passwordConfirmation')
      await schema.validateAsync(input, { abortEarly: true })
    } catch (error) {
      return error
    }
  }
}
