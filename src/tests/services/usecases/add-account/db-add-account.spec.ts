import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { Hasher } from '@/services/protocols/criptography/hasher'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'
import { DbAddAccount } from '@/services/usecases/add-account/db-add-account'

const makeFakeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('any_hashed')
    }
  }
  return new HasherStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeFakeAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  role: 'any_role'
})

describe('DbAddAccount', () => {
  let sut: DbAddAccount
  let hasherStub: Hasher
  let loadAccountByEmailRepositoryStub

  beforeEach(() => {
    hasherStub = makeFakeHasher()
    loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    sut = new DbAddAccount(hasherStub, loadAccountByEmailRepositoryStub)
  })
  test('should call Hasher with correct value', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const addAccountPromise = sut.add(makeFakeAccountParams())
    await expect(addAccountPromise).rejects.toThrow()
  })

  test('should return null if account already exists', async () => {
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(() => {
      const fakeAccount = { ...makeFakeAccountParams(), id: 'any_id' }
      return Promise.resolve(fakeAccount)
    })
    const account = await sut.add(makeFakeAccountParams())
    expect(account).toBe(null)
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })
})
