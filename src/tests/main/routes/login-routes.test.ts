import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import app from '@/main/config/app'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'

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

  describe('POST /signup', () => {
    test('should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'anyemail@gmail.com',
          password: 'anypassword',
          passwordConfirmation: 'anypassword'
        })
        .expect(200)
    })
  })
})
