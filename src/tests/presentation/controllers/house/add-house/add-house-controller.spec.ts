import { HouseModel } from '@/domain/models/house'
import { AddHouse, AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseController } from '@/presentation/controllers/house/add-house/add-house-controller'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { Validation } from '@/presentation/protocols/validation'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void | Error> { }
  }
  return new ValidationStub()
}

const makeFakeHouse = () => {
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
    },
    images: ['any_image'],
    highlightImage: 'any_highlight_image'
  }
  return fakeHouse
}

const makeFakeAddHouse = (): AddHouse => {
  class AddHouseStub implements AddHouse {
    async add (house: AddHouseParams): Promise<HouseModel> {
      const fakeHouse = makeFakeHouse()
      return Promise.resolve(fakeHouse)
    }
  }

  return new AddHouseStub()
}

type SutTypes = {
  sut: AddHouseController,
  validationStub: Validation,
  addHouseStub: AddHouse
}

const makeSut = (): SutTypes => {
  const addHouseStub = makeFakeAddHouse()
  const validationStub = makeFakeValidation()
  const sut = new AddHouseController(addHouseStub, validationStub)
  return {
    sut,
    validationStub,
    addHouseStub
  }
}

describe('AddHouse Controller', () => {
  test('should return 400 if Validation returns an error', async () => {
    const { validationStub, sut } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new Error()))
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should return 500 if AddHouse throws', async () => {
    const { sut, addHouseStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'fake_stack'
    jest.spyOn(addHouseStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(fakeError)
    })
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(serverError(fakeError))
  })

  test('should call AddHouse with correct values', async () => {
    const { sut, addHouseStub } = makeSut()
    const addSpy = jest.spyOn(addHouseStub, 'add')
    await sut.handle({ body: { param: 'any' } })
    expect(addSpy).toHaveBeenCalledWith({ param: 'any' })
  })

  test('should return the house on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { param: 'any' } })
    expect(httpResponse).toEqual(ok(makeFakeHouse()))
  })
})
