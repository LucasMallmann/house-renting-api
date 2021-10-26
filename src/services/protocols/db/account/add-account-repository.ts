import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/models/account'

export interface AddAccountRepository {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
