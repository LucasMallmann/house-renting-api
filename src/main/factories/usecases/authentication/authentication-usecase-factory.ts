import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypter-adapter'
import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { DbAuthentication } from '@/services/usecases/authentication/db-authentication'

export const makeDbAuthentication = (): DbAuthentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const jwtAdatper = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdatper,
    accountMongoRepository
  )
  return dbAuthentication
}
