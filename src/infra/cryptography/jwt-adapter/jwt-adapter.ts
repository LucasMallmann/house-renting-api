import jwt from 'jsonwebtoken'
import { Encrypter } from '@/services/protocols/criptography/encrypter'
import { Decrypter } from '@/services/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const jwtValue = jwt.sign({ id: value }, this.secret)
    return jwtValue
  }

  async decrypt (token: string): Promise<string> {
    const jwtPayload = jwt.verify(token, this.secret)
    return jwtPayload as string
  }
}
