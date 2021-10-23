import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest } from '@/presentation/helpers/http'

export class SignupController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest) : Promise<HttpResponse> {
    const validationError = await this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }
    return { statusCode: 200 }
  }
}
