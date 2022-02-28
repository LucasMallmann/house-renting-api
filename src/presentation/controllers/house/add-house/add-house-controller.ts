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
      const validationError = await this.validation.validate({ ...httpRequest.body, images: httpRequest.files })
      if (validationError) {
        return badRequest(validationError)
      }

      const { name, city, state } = httpRequest.body

      const parsedHouse = {
        location: {
          type: httpRequest.body['location.type'],
          coordinates: httpRequest.body['location.coordinates'] && JSON.parse(httpRequest.body['location.coordinates'])
        },
        address: {
          street: httpRequest.body['address.street'],
          houseNumber: httpRequest.body['address.houseNumber'] && JSON.parse(httpRequest.body['address.houseNumber']),
          zipCode: httpRequest.body['address.zipCode']
        }
      }

      const house = await this.addHouse.add({
        ...parsedHouse,
        name,
        city,
        state,
        images: httpRequest.files,
        highlightImage: 'highlightImage',
        price: httpRequest.body.price
      })

      return ok(house)
    } catch (error) {
      return serverError(error)
    }
  }
}
