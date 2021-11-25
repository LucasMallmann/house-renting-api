import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypter-adapter'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { DbAddAccount } from '@/services/usecases/add-account/db-add-account'

export const makeDbAddAccount = (): DbAddAccount => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(12)
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
