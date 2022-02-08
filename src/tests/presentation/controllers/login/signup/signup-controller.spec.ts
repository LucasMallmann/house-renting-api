import { AddAccount, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/account'
import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { serverError, ok, forbidden } from '@/presentation/helpers/http'
import { EmailInUseError } from '@/presentation/errors'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void | Error> { }
  }
  return new ValidationStub()
}

const makeFakeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
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

  return new AddAccountStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    role: 'any_role'
  }
})

describe('SignupController', () => {
  let sut: SignupController
  let validationStub: Validation
  let addAccountStub: AddAccount

  beforeEach(() => {
    validationStub = makeFakeValidation()
    addAccountStub = makeFakeAddAccount()
    sut = new SignupController(addAccountStub, validationStub)
  })

  test('should return 400 if Validation returns an error', async () => {
    const httpRequest = makeFakeHttpRequest()
    const mockedError = new Error()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(mockedError))
    const response = await sut.handle(httpRequest)
    expect(response).toEqual({ statusCode: 400, body: mockedError })
  })

  test('should call AddAccount with correct values', async () => {
    const httpRequest = makeFakeHttpRequest()
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'any_role'
    })
  })

  test('should return 500 if AddAccount throws an exception', async () => {
    const httpRequest = makeFakeHttpRequest()
    const fakeError = new Error()
    fakeError.stack = 'fake_stack'
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(fakeError)
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(fakeError))
  })

  test('should return 403 if email already exists', async () => {
    const httpRequest = makeFakeHttpRequest()
    // const emailInUse = new Error()
    // fakeError.stack = 'fake_stack'
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('should return 200 on AddAccount success', async () => {
    const httpRequest = makeFakeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'any_role'
    }))
  })
})
