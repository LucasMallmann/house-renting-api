import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import app from '@/main/config/app'

describe('Body Parser', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should respond with json', async () => {
    app.post('/test_body_parser', (request, response) => {
      return response.json(request.body)
    })

    request(app)
      .post('/test_body_parser')
      .send({ name: 'john' })
      .expect('Content-Type', /json/)
      .expect({ name: 'john' })
  })
})
