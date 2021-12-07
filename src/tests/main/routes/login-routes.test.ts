import request from 'supertest'
import { hash } from 'bcrypt'
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

  describe('POST /signin', () => {
    test('should return 200 on signin success', async () => {
      const hashedPassword = await hash('anypassword', 12)

      const account = new AccountMongooseModel({
        name: 'any_name',
        email: 'anyemail@gmail.com',
        password: hashedPassword
      })

      await account.save()

      await request(app)
        .post('/api/signin')
        .send({
          email: 'anyemail@gmail.com',
          password: 'anypassword'
        })
        .expect(200)
    })

    test('should return 401 on signin failure', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'anyemail@gmail.com',
          password: 'anypassword'
        })
        .expect(401)
    })
  })
})
