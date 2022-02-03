import { makeLogErrorDecorator } from '@/main/factories/decorators/log-error-decoratory-factory'
import { makeDbAddHouse } from '@/main/factories/usecases/add-house/db-add-house-factory'
import { AddHouseController } from '@/presentation/controllers/house/add-house/add-house-controller'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddHouseController = (): Controller => {
  const dbAddHouse = makeDbAddHouse()
  class FakeValidation implements Validation {
    async validate (input: any): Promise<void | Error> {}
  }
  const fakeValidation = new FakeValidation()
  const addHouseController = new AddHouseController(dbAddHouse, fakeValidation)
  return makeLogErrorDecorator(addHouseController)
}
