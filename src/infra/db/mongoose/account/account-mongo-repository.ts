import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/account'
import { AddAccountRepository } from '@/services/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongooseModel } from '../models/mongoose-account-model'
import { UpdateAccessTokenRepository } from '@/services/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/services/protocols/db/account/load-account-by-token-repository'

export class AccountMongoRepository
implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    const accountDocument = new AccountMongooseModel(account)
    const createdAccount = await accountDocument.save()
    return { ...account, id: createdAccount._id }
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const account = await AccountMongooseModel.findOne({ email }).exec()
    if (account) {
      return MongoHelper.withId(account?.toObject())
    }
    return null
  }

  async updateAccessToken (accountId: string, accessToken: string): Promise<void> {
    await AccountMongooseModel.findByIdAndUpdate(accountId, { accessToken })
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
    const account = await AccountMongooseModel.findOne({ accessToken, role })
    if (account) {
      return MongoHelper.withId(account.toObject())
    }
    return Promise.resolve(null)
  }
}
