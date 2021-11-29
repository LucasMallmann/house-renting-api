import { AccountModel } from '@/domain/models/account'
import { Encrypter } from '@/services/protocols/criptography/encrypter'
import { HashComparer } from '@/services/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/services/protocols/db/account/update-access-token-repository'
import { DbAuthentication } from '@/services/usecases/authentication/db-authentication'

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
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeFakeHashComparer = (): HashComparer => {
  class HasherStub implements HashComparer {
    async compare (value: string, hash:string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HasherStub()
}

const makeFakeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('any_encrypted_value_jwt')
    }
  }
  return new EncrypterStub()
}

const makeFakeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (accountId: string, accessToken: string): Promise<void> {
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

const makeFakeAuthParams = () => ({
  email: 'any_email',
  password: 'any_password'
})

describe('Db Authentication', () => {
  let sut: DbAuthentication
  let loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  let hashComparerStub: HashComparer
  let encrypterStub: Encrypter
  let updateAccessTokenRepositoryStub: UpdateAccessTokenRepository

  beforeEach(() => {
    loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    hashComparerStub = makeFakeHashComparer()
    encrypterStub = makeFakeEncrypter()
    updateAccessTokenRepositoryStub = makeFakeUpdateAccessTokenRepository()

    sut = new DbAuthentication(
      loadAccountByEmailRepositoryStub,
      hashComparerStub,
      encrypterStub,
      updateAccessTokenRepositoryStub
    )
  })

  test('should call LoadAccountByEmailRepository with correct value', async () => {
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeFakeAuthParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(null))
    const token = await sut.auth(makeFakeAuthParams())
    expect(token).toBeNull()
  })

  test('should call hashComparer with correct values', async () => {
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthParams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_pwd')
  })

  test('should return null if HashComparer returns false', async () => {
    jest.spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false))
    const token = await sut.auth(makeFakeAuthParams())
    expect(token).toBeNull()
  })

  test('should call Encrypter with correct value', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('should call UpdateAccessToken with correct values', async () => {
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(makeFakeAuthParams())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_encrypted_value_jwt')
  })

  test('should return accessToken on success', async () => {
    const accessToken = await sut.auth(makeFakeAuthParams())
    expect(accessToken).toBe('any_encrypted_value_jwt')
  })
})
