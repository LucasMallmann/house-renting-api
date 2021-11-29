import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { Authentication } from '@/domain/usecases/authentication'

export class SigninController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest) : Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      const { email, password } = httpRequest.body
      await this.authentication.auth({ email, password })
      return Promise.resolve(ok({}))
    } catch (error) {
      return serverError(error)
    }
  }
}
