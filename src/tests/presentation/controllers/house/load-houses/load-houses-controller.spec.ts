import { HouseModel } from '@/domain/models/house'
import { LoadHouses } from '@/domain/usecases/load-houses'
import { LoadHousesController } from '@/presentation/controllers/house/load-houses/load-houses-controller'
import { serverError, noContent, ok } from '@/presentation/helpers/http'

const makeFakeHouses = () => {
  return [
    {
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
      highlightImage: 'any_highlight_image',
      createdAt: new Date(),
      price: 100,
      owner: {
        email: 'any_email',
        name: 'any_name'
      }
    }
  ]
}

const makeFakeLoadHouses = (): LoadHouses => {
  class LoadHousesStub implements LoadHouses {
    async load (): Promise<HouseModel[] | null> {
      return Promise.resolve(makeFakeHouses())
    }
  }
  return new LoadHousesStub()
}

describe('LoadHousesController', () => {
  let sut: LoadHousesController
  let loadHousesStub: LoadHouses

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-10-10').getTime())
  })

  beforeEach(() => {
    loadHousesStub = makeFakeLoadHouses()
    sut = new LoadHousesController(loadHousesStub)
  })

  test('should return 500 if LoadHouses throws', async () => {
    jest.spyOn(loadHousesStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 if LoadHouses returns empty', async () => {
    jest.spyOn(loadHousesStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 200 on success', async () => {
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeHouses()))
  })
})
