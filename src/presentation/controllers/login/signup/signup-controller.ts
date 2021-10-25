import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest } from '@/presentation/helpers/http'
import { AddAccount } from '@/domain/usecases/add-account'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest) : Promise<HttpResponse> {
    const validationError = await this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }
    const { name, email, password, role } = httpRequest.body
    await this.addAccount.add({ name, email, password, role })
    return { statusCode: 200 }
  }
}
