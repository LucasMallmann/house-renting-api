import { LogErrorRepository } from '@/services/protocols/db/log/log-error-repository'
import { LogErrorMongooseModel } from '../models/mongoose-log-model'

export class LogErrorMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logError = new LogErrorMongooseModel({ stack })
    await logError.save()
  }
}
