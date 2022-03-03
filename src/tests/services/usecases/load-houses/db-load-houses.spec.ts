
import { HouseModel } from '@/domain/models/house'
import { LoadHousesRepository } from '@/services/protocols/db/house/load-houses-repository'
import { DbLoadHouses } from '@/services/usecases/load-houses/db-load-houses'

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
    images: ['any_filename'],
    highlightImage: 'any_highlight_image',
    createdAt: new Date(),
    price: 100,
    owner: {
      name: 'any_name',
      email: 'any_email'
    }
  }
  return fakeHouse
}

const makeLoadHousesRepository = (): LoadHousesRepository => {
  class LoadHousesRepositoryStub implements LoadHousesRepository {
    async loadAll (): Promise<HouseModel[]> {
      return [makeFakeHouse()]
    }
  }
  return new LoadHousesRepositoryStub()
}

describe('DbLoadHouses', () => {
  let sut: DbLoadHouses
  let loadHousesRepositoryStub: LoadHousesRepository

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-10-10').getTime())
  })

  beforeEach(() => {
    loadHousesRepositoryStub = makeLoadHousesRepository()
    sut = new DbLoadHouses(loadHousesRepositoryStub)
  })

  test('should call LoadHousesRepository correctly', async () => {
    const loadHousesRepositorySpy = jest.spyOn(loadHousesRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadHousesRepositorySpy).toHaveBeenCalled()
  })

  test('should throw if LoadHousesRepository throws', async () => {
    jest.spyOn(loadHousesRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('should return a list of houses on success', async () => {
    const houses = await sut.load()
    expect(houses).toEqual([makeFakeHouse()])
  })
})
