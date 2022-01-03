import { HouseModel } from '@/domain/models/house'
import { AddHouse, AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseController } from '@/presentation/controllers/house/add-house/add-house-controller'
import { badRequest } from '@/presentation/helpers/http'
import { Validation } from '@/presentation/protocols/validation'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void | Error> { }
  }
  return new ValidationStub()
}

const makeFakeAddHouse = (): AddHouse => {
  class AddHouseStub implements AddHouse {
    async add (account: AddHouseParams): Promise<HouseModel> {
      const fakeHouse: HouseModel = {
        id: 'any_id',
        name: 'any_name',
        city: 'any_city',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        state: 'any_state',
        address: {
          houseNumber: 0,
          street: 'any_street',
          zipCode: 'any_zipCode'
        }
      }
      return Promise.resolve(fakeHouse)
    }
  }

  return new AddHouseStub()
}

type SutTypes = {
  sut: AddHouseController,
  validationStub: Validation,
}

const makeSut = (): SutTypes => {
  const addHouseStub = makeFakeAddHouse()
  const validationStub = makeFakeValidation()
  const sut = new AddHouseController(addHouseStub, validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddHouse Controller', () => {
  test('should return 400 if Validation returns an error', async () => {
    const { validationStub, sut } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new Error()))
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
