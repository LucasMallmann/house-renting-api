import { AddAccount, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { Hasher } from '@/services/protocols/hasher'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel | null> {
    await this.hasher.hash(account.password)
    return {} as AccountModel
  }
}
