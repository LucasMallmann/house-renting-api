import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication-middleware'
import { makeDbLoadAccountByToken } from '../usecases/load-account-by-token/load-account-by-token'

export const makeAuthenticationMiddleware = (role?: string): AuthenticationMiddleware => {
  const loadAccountByToken = makeDbLoadAccountByToken()
  const authMiddleware = new AuthenticationMiddleware(loadAccountByToken, role)
  return authMiddleware
}
