import { LogErrorMongoRepository } from '@/infra/db/mongoose/log/log-error-mongo-repository'
import { LogControllerDecorator } from '@/presentation/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols/controller'

export const makeLogErrorDecorator = (controller: Controller): LogControllerDecorator => {
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(controller, logErrorMongoRepository)
}
