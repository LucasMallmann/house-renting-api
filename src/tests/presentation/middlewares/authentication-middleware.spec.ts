import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication-middleware'
import { HttpRequest } from '@/presentation/protocols/http'

const makeFakeLoadAccountByToken = () => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByToken {
    async loadAccount (accessToken: string, role?: string): Promise<AccountModel | null> {
      const fakeAccount: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        role: 'any_role'
      }
      return Promise.resolve(fakeAccount)
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

describe('Authentication Middleware', () => {
  let sut: AuthenticationMiddleware
  let loadAccountByTokenRepositoryStub: LoadAccountByToken
  const FAKE_ROLE = 'admin'

  beforeEach(() => {
    loadAccountByTokenRepositoryStub = makeFakeLoadAccountByToken()
    sut = new AuthenticationMiddleware(loadAccountByTokenRepositoryStub, FAKE_ROLE)
  })

  test('should call LoadAccountByToken with correct values', async () => {
    const loadAccountSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccount')
    await sut.handle(makeFakeHttpRequest())
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token', 'admin')
  })

  test('should return 401 if no x-access-token is provided', async () => {
    const response = await sut.handle({})
    expect(response).toEqual(unauthorized())
  })

  test('should return 500 if LoadAccountByToken throws', async () => {
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccount').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccount').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(forbidden())
  })

  test('should return 200 on success', async () => {
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(ok({
      account: {
        name: 'any_name',
        email: 'any_email'
      }
    }))
  })
})
