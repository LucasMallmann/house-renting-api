import { AccountModel } from '@/models/account'

export type AddAccountParams = {
  name: string
  email: string,
  password: string
  role: string
}

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
