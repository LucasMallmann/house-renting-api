import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AddAccount } from '@/domain/usecases/add-account'
import { EmailInUseError } from '@/presentation/errors'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest) : Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      const { name, email, password, role } = httpRequest.body
      const createdAccount = await this.addAccount.add({ name, email, password, role })
      if (!createdAccount) {
        return forbidden(new EmailInUseError())
      }
      return ok(createdAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
