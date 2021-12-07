import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import app from '@/main/config/app'

describe('CORS', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should enable cors', async () => {
    app.get('/test_cors', (_, response) => {
      return response.send()
    })

    await request(app).get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
