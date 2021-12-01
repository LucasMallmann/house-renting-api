import Joi from 'joi'
import { Validation } from '@/presentation/protocols/validation'

export class SigninControllerValidation implements Validation {
  async validate (input: any): Promise<void | Error> {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
      await schema.validateAsync(input, { abortEarly: true })
    } catch (error) {
      return error
    }
  }
}
