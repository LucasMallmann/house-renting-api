import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'
import app from '@/main/config/app'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    await AccountMongooseModel.deleteMany()
  })

  describe('POST /houses', () => {
    test('should return 200 on adding a house success', async () => {
      const fakeHouse = {
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

      await request(app)
        .post('/api/houses')
        .send(fakeHouse)
        .expect(200)
    })
  })
})
