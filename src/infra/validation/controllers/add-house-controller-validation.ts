import Joi from 'joi'
import { Validation } from '@/presentation/protocols/validation'

export class AddHouseControllerValidation implements Validation {
  async validate (input: any): Promise<void | Error> {
    try {
      const schema = Joi.object({
        city: Joi.string().required(),
        state: Joi.string().required(),
        name: Joi.string().required(),
        'location.type': Joi.string().required(),
        'location.coordinates': Joi.string().required(),
        'address.street': Joi.string().required(),
        'address.houseNumber': Joi.number().required(),
        'address.zipCode': Joi.string().required(),
        images: Joi.array().items(Joi.object({
          fieldname: Joi.string(),
          originalname: Joi.string(),
          encoding: Joi.string(),
          mimetype: Joi.string(),
          destination: Joi.string(),
          filename: Joi.string(),
          path: Joi.string(),
          size: Joi.number()
        })),
        price: Joi.number().required(),
        highlightImage: Joi.string().required()
      })

      await schema.validateAsync(input, { abortEarly: true })
    } catch (error) {
      return error
    }
  }
}
