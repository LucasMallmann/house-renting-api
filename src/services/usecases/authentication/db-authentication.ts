import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { Encrypter } from '@/services/protocols/criptography/encrypter'
import { HashComparer } from '@/services/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/services/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/services/protocols/db/account/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authParams: AuthenticationParams): Promise<string | null> {
    const { email, password } = authParams
    const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (existingAccount) {
      const isPasswordValid = await this.hashComparer.compare(password, existingAccount.password)
      if (isPasswordValid) {
        const encryptedValue = await this.encrypter.encrypt(existingAccount.id)
        await this.updateAccessTokenRepository.updateAccessToken(existingAccount.id, encryptedValue)
        return encryptedValue
      }
    }
    return null
  }
}
