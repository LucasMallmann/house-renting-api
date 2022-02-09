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
      const validationError = await this.validation.validate({ ...httpRequest.body, ...httpRequest.files })
      if (validationError) {
        return badRequest(validationError)
      }

      console.log(httpRequest.files)

      const { location, ...addHouseParams } = httpRequest.body

      const houseParams = {
        location: JSON.parse(location),
        ...addHouseParams,
        images: httpRequest.files
      }

      const house = await this.addHouse.add(houseParams)
      return ok(house)
    } catch (error) {
      return serverError(error)
    }
  }
}
