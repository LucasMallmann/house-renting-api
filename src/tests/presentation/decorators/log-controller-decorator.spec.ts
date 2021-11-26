import { LogControllerDecorator } from '@/presentation/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogErrorRepository } from '@/services/protocols/db/log/log-error-repository'

const makeFakeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> { }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return { statusCode: 200 }
    }
  }
  return new ControllerStub()
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

describe('LogControllerDecorator', () => {
  let controllerStub: Controller
  let sut: LogControllerDecorator
  let logErrorRepositoryStub: LogErrorRepository

  beforeEach(() => {
    controllerStub = makeFakeControllerStub()
    logErrorRepositoryStub = makeFakeLogErrorRepositoryStub()
    sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  })

  test('should Controller.handle', async () => {
    const httpRequest = makeFakeHttpRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
