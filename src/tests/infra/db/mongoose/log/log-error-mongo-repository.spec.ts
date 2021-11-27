import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { LogErrorMongoRepository } from '@/infra/db/mongoose/log/log-error-mongo-repository'
import { LogErrorMongooseModel } from '@/infra/db/mongoose/models/mongoose-log-model'

const makeSut = (): LogErrorMongoRepository => {
  return new LogErrorMongoRepository()
}

describe('LogErrorMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should log an error on success', async () => {
    const sut = makeSut()
    await sut.logError('any_stack_error')
    const foundErrorLog = await LogErrorMongooseModel.findOne({ stack: 'any_stack_error' })
    expect(foundErrorLog?._id).toBeTruthy()
  })
})
