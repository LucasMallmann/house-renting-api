import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { SigninController } from '@/presentation/controllers/login/signin/signin-controller'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void | Error> { }
  }
  return new ValidationStub()
}

const makeFakeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authParams: AuthenticationParams): Promise<string | null> {
      return Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

describe('SigninController', () => {
  let sut: SigninController
  let validationStub: Validation
  let authenticationStub: Authentication

  beforeEach(() => {
    validationStub = makeFakeValidation()
    authenticationStub = makeFakeAuthentication()
    sut = new SigninController(validationStub, authenticationStub)
  })

  test('should call Authentication with correct values', async () => {
    const httpRequest = makeFakeHttpRequest()
    const addAccountSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password'
    })
  })
})
