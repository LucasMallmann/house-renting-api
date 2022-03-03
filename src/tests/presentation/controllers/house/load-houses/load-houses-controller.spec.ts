import { HouseModel } from '@/domain/models/house'
import { LoadHouses } from '@/domain/usecases/load-houses'
import { LoadHousesController } from '@/presentation/controllers/house/load-houses/load-houses-controller'
import { serverError } from '@/presentation/helpers/http'

const makeFakeLoadHouses = (): LoadHouses => {
  class LoadHousesStub implements LoadHouses {
    async load (): Promise<HouseModel[] | null> {
      return Promise.resolve([])
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
})
