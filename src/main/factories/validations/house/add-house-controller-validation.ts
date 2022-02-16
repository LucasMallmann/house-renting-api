import { AddHouseControllerValidation } from '@/infra/validation/controllers'

export const makeAddHouseControllerValidation = (): AddHouseControllerValidation => {
  return new AddHouseControllerValidation()
}
