import { HouseMongoRepository } from '@/infra/db/mongoose/house/house-mongo-repository'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'
import { HouseMongooseModel } from '@/infra/db/mongoose/models/mongoose-house-model'

const makeSut = (): HouseMongoRepository => {
  return new HouseMongoRepository()
}

const makeFakeHouses = () => {
  return [
    {
      name: 'any_name_1',
      city: 'any_city_1',
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
    },
    {
      name: 'any_name_2',
      city: 'any_city_2',
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

describe('House Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany()
    await HouseMongooseModel.deleteMany()
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
        highlightImage: 'any_highlight_image',
        price: 100,
        owner: {
          name: 'any_name',
          email: 'any_email'
        }
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

  describe('loadAll()', () => {
    test('should return houses on success', async () => {
      const sut = makeSut()
      await HouseMongooseModel.insertMany(makeFakeHouses())
      const houses = await sut.loadAll()
      expect(houses).toBeTruthy()
      expect(houses.length).toBe(2)
      expect(houses[0].name).toBe('any_name_1')
      expect(houses[0].city).toBe('any_city_1')
      expect(houses[1].name).toBe('any_name_2')
      expect(houses[1].city).toBe('any_city_2')
      expect(houses[0].address).toEqual({
        houseNumber: 0,
        street: 'any_street',
        zipCode: 'any_zipCode'
      })
    })
  })
})
