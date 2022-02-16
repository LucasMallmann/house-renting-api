import request from 'supertest'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'
import app from '@/main/config/app'
import env from '@/main/config/env'

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
      const hashedPassword = await hash('anypassword', 12)

      const account = new AccountMongooseModel({
        name: 'any_name',
        email: 'anyemail@gmail.com',
        password: hashedPassword
      })

      const id = account.id
      const accessToken = sign({ id }, env.jwtSecret)

      account.accessToken = accessToken

      await account.save()

      await request(app)
        .post('/api/houses')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-access-token', accessToken)
        .field('name', 'any_name')
        .field('city', 'any_city')
        .field('state', 'any_state')
        .field('location.type', 'Point')
        .field('location.coordinates', '[0, 2]')
        .field('address.street', 'Rua dos Limões')
        .field('address.houseNumber', '10')
        .field('address.zipCode', 'code')
        .field('highlightImage', 'any_highlight_image')
        .attach('files', 'src/tests/fixtures/image.jpeg')
        .expect(200)
    })
  })
})
