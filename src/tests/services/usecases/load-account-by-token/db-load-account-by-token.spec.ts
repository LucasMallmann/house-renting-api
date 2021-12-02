import { AccountModel } from '@/domain/models/account'
import { Decrypter } from '@/services/protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '@/services/protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from '@/services/usecases/load-account-by-token/db-load-account-by-token'

const makeFakeAccount = (): AccountModel => ({
  email: 'any_email',
  name: 'any_name',
  password: 'hashed_pwd',
  role: 'any_role',
  id: 'any_id'
})

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeFakeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return Promise.resolve('decoded')
    }
  }
  return new DecrypterStub()
}

describe('Load Account By Token', () => {
  let sut: DbLoadAccountByToken
  let loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  let decrypterStub: Decrypter

  beforeEach(() => {
    loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
    decrypterStub = makeFakeDecrypter()
    sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub, decrypterStub)
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.loadAccount('access_token', 'any_role')
    expect(loadSpy).toHaveBeenCalledWith('access_token', 'any_role')
  })

  test('should call Decrypter with correct value', async () => {
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadAccount('access_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('access_token')
  })

  test('should return null if decrypter throws', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.loadAccount('access_token', 'any_role')
    expect(result).toBeNull()
  })

  test('should return null if decrypter fails', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const account = await sut.loadAccount('access_token', 'any_role')
    expect(account).toBeNull()
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.loadAccount('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('should return an account on success', async () => {
    const account = await sut.loadAccount('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })
})
