import { makeLogErrorDecorator } from '@/main/factories/decorators/log-error-decoratory-factory'
import { makeDbAddHouse } from '@/main/factories/usecases/add-house/db-add-house-factory'
import { makeAddHouseControllerValidation } from '@/main/factories/validations/house/add-house-controller-validation'
import { AddHouseController } from '@/presentation/controllers/house/add-house/add-house-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeAddHouseController = (): Controller => {
  const dbAddHouse = makeDbAddHouse()
  const addHouseControllerValidation = makeAddHouseControllerValidation()
  const addHouseController = new AddHouseController(dbAddHouse, addHouseControllerValidation)
  return makeLogErrorDecorator(addHouseController)
}
