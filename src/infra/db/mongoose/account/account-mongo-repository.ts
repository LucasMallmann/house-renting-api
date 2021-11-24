import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { AddAccountRepository } from '@/services/protocols/db/account/add-account-repository'
import { Account } from '../models/mongoose-account-model'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    const accountDocument = new Account(account)
    const createdAccount = await accountDocument.save()
    return { ...account, id: createdAccount._id }
  }
}
