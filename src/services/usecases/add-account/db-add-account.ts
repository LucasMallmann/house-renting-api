import { AddAccount, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'
import { Hasher } from '@/services/protocols/criptography/hasher'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel | null> {
    const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (existingAccount) {
      return null
    }
    await this.hasher.hash(account.password)
    return {} as AccountModel
  }
}
