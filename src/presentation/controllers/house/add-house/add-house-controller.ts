import { AddHouse } from '@/domain/usecases/add-house'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddHouseController implements Controller {
  constructor (
    private readonly addHouse: AddHouse,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      const house = await this.addHouse.add(httpRequest.body)
      return ok(house)
    } catch (error) {
      return serverError(error)
    }
  }
}
