
import { HouseModel } from '@/domain/models/house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'
import { DbAddHouse } from '@/services/usecases/add-house/db-add-house'

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

const makeAddHouseRepository = (): AddHouseRepository => {
  class AddHouseRepositoryStub implements AddHouseRepository {
    async addHouse (house: HouseModel): Promise<HouseModel> {
      return makeFakeHouse()
    }
  }
  return new AddHouseRepositoryStub()
}

describe('DbAddHouse', () => {
  let sut: DbAddHouse
  let addHouseRepositoryStub: AddHouseRepository

  beforeEach(() => {
    addHouseRepositoryStub = makeAddHouseRepository()
    sut = new DbAddHouse(addHouseRepositoryStub)
  })

  test('should call AddHouseRepository with correct values', async () => {
    const addHouseSpy = jest.spyOn(addHouseRepositoryStub, 'addHouse')
    const fakeHouse = makeFakeHouse()
    await sut.add(fakeHouse)
    expect(addHouseSpy).toHaveBeenCalledWith(fakeHouse)
  })
})
