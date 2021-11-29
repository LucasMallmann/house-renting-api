// import { Collection } from 'mongodb'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import { AccountMongooseModel } from '@/infra/db/mongoose/models/mongoose-account-model'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('addAccount()', () => {
    test('should create an account on success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const account = new AccountMongooseModel({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      })

      await account.save()

      const loadedAccount = await sut.loadByEmail(account.email)

      expect(loadedAccount).toBeTruthy()
      expect(loadedAccount?.id).toBeTruthy()
      expect(loadedAccount?.name).toBe('any_name')
      expect(loadedAccount?.email).toBe('any_email@email.com')
      expect(loadedAccount?.password).toBe('any_password')
    })

    test('should return null if loadByEmail returns null', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('should update accessToken on success', async () => {
      const sut = makeSut()
      const account = new AccountMongooseModel({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      })
      await account.save()
      expect(account.toObject().accessToken).toBeFalsy()
      await sut.updateAccessToken(account?._id as string, 'any_token')
      const updatedAccount = await AccountMongooseModel.findById(account?._id as string)
      expect(updatedAccount?.toObject()?.accessToken).toBe('any_token')
    })
  })
})
