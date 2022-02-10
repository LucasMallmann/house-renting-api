import env from '@/main/config/env'
import { LogErrorRepository } from '@/services/protocols/db/log/log-error-repository'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      if (env.env !== 'test') {
        console.error(httpResponse.body.stack)
      }
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
