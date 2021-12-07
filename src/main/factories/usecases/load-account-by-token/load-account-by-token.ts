import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { DbLoadAccountByToken } from '@/services/usecases/load-account-by-token/db-load-account-by-token'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbLoadAccountByToken = new DbLoadAccountByToken(accountMongoRepository, jwtAdapter)
  return dbLoadAccountByToken
}
