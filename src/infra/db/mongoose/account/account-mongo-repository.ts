import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { AddAccountRepository } from '@/services/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountModelMongoose } from '../models/mongoose-account-model'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    const accountDocument = new AccountModelMongoose(account)
    const createdAccount = await accountDocument.save()
    return { ...account, id: createdAccount._id }
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const account = await AccountModelMongoose.findOne({ email }).exec()
    if (account) {
      return MongoHelper.withId(account?.toObject())
    }
    return null
  }
}
