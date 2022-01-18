import { HouseMongoRepository } from '@/infra/db/mongoose/account/house-mongo-repository'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'

const makeSut = (): HouseMongoRepository => {
  return new HouseMongoRepository()
}

describe('House Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('addHouse()', () => {
    test('should create a house on success', async () => {
      const sut = makeSut()
      const createdHouse = await sut.addHouse({
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
      })

      expect(createdHouse).toBeTruthy()
      expect(createdHouse.id).toBeTruthy()
      expect(createdHouse.name).toBe('any_name')
      expect(createdHouse.city).toBe('any_city')
      expect(createdHouse.address).toEqual({
        houseNumber: 0,
        street: 'any_street',
        zipCode: 'any_zipCode'
      })
    })
  })
})
