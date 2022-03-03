import { LoadHouses } from '@/domain/usecases/load-houses'
import { ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadHousesController implements Controller {
  constructor (
    private readonly loadHouses: LoadHouses
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const houses = await this.loadHouses.load()
      return ok(houses)
    } catch (error) {
      return serverError(error)
    }
  }
}
