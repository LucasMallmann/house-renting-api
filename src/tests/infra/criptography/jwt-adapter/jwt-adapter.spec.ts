import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'

const SECRET_KEY = 'SECRET_KEY'

jest.mock('jsonwebtoken', () => {
  return {
    async sign (): Promise<string> {
      return Promise.resolve('jwt_value')
    },

    async verify (): Promise<string> {
      return Promise.resolve('decoded_value')
    }
  }
})

describe('Jwt Adapter', () => {
  let sut: JwtAdapter

  beforeEach(() => {
    sut = new JwtAdapter(SECRET_KEY)
  })

  describe('encrypt()', () => {
    test('should call jwt.sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'value' }, SECRET_KEY)
    })

    test('should return encrypted value on success', async () => {
      const jwtValue = await sut.encrypt('value')
      expect(jwtValue).toBe('jwt_value')
    })
  })

  test('should throw if jwt throws', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const accessTokenPromise = sut.encrypt('any_id')
    await expect(accessTokenPromise).rejects.toThrow()
  })

  describe('decrypt()', () => {
    test('should call jwt.verify with correct values', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('token')
      expect(verifySpy).toHaveBeenCalledWith('token', SECRET_KEY)
    })

    test('should return decoded value on success', async () => {
      const decodedValue = await sut.decrypt('value')
      expect(decodedValue).toBe('decoded_value')
    })
  })
})
