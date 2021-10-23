import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class SignupController implements Controller {
  async handle (httpRequest: HttpRequest) : Promise<HttpResponse> {
    return Promise.resolve({ statusCode: 400 })
  }
}
