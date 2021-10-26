import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { Hasher } from '@/services/protocols/criptography/hasher'
import { AddAccountRepository } from '@/services/protocols/db/account/add-account-repository'
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

const makeFakeAccount = (): AccountModel => ({
  email: 'any_email',
  name: 'any_name',
  password: 'hashed_pwd',
  role: 'any_role',
  id: 'any_id'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new AddAccountRepositoryStub()
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
  let loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  let addAccountRepositoryStub: AddAccountRepository

  beforeEach(() => {
    hasherStub = makeFakeHasher()
    loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    addAccountRepositoryStub = makeAddAccountRepository()
    sut = new DbAddAccount(hasherStub, loadAccountByEmailRepositoryStub, addAccountRepositoryStub)
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
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const account = await sut.add(makeFakeAccountParams())
    expect(account).toBe(null)
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should call AddAccountRepository with correct values', async () => {
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.resolve('hashed_pwd'))
    await sut.add(makeFakeAccountParams())
    const fakeParams = { ...makeFakeAccountParams(), password: 'hashed_pwd' }
    expect(addSpy).toHaveBeenCalledWith(fakeParams)
  })

  test('should return an account on success', async () => {
    const account = await sut.add(makeFakeAccountParams())
    expect(account).toEqual({
      email: 'any_email',
      name: 'any_name',
      password: 'hashed_pwd',
      role: 'any_role',
      id: 'any_id'
    })
  })
})
