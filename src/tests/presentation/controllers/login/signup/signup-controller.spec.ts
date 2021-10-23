import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'
import { Validation } from '@/presentation/protocols/validation'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void | Error> { }
  }

  return new ValidationStub()
}

describe('SignupController', () => {
  let sut: SignupController
  let validationStub: Validation

  beforeEach(() => {
    validationStub = makeFakeValidation()
    sut = new SignupController(validationStub)
  })

  test('should return 400 if Validation returns an error', async () => {
    const httpRequest = { body: {} }
    const mockedError = new Error()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(mockedError))
    const response = await sut.handle(httpRequest)
    expect(response).toEqual({ statusCode: 400, body: mockedError })
  })
})
