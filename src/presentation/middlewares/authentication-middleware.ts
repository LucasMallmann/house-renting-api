import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'
import { forbidden, ok, serverError, unauthorized } from '../helpers/http'

export class AuthenticationMiddleware implements Middleware {
  constructor (
  private readonly loadAccountByToken: LoadAccountByToken,
  private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest?.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.loadAccount(accessToken, this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
        return forbidden()
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}
