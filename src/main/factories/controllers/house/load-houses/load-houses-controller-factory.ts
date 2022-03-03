import { makeLogErrorDecorator } from '@/main/factories/decorators/log-error-decoratory-factory'
import { makeDbLoadHouses } from '@/main/factories/usecases/load-houses/db-load-houses-factory'
import { LoadHousesController } from '@/presentation/controllers/house/load-houses/load-houses-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeLoadHousesController = (): Controller => {
  const dbLoadHouses = makeDbLoadHouses()
  const loadHousesController = new LoadHousesController(dbLoadHouses)
  return makeLogErrorDecorator(loadHousesController)
}
