import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypter-adapter'

const SALT = 12

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return Promise.resolve('hashed_value')
    }
  }
})

describe('Bcrypt Adapter', () => {
  let sut: BcryptAdapter

  beforeEach(() => {
    sut = new BcryptAdapter(SALT)
  })

  describe('hash()', () => {
    test('should call bcrypt hash with correct values', async () => {
      const bcryptSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(bcryptSpy).toHaveBeenCalledWith('any_value', SALT)
    })

    test('should return hashed value correctly on success', async () => {
      const hashedValue = await sut.hash('some_value')
      expect(hashedValue).toBe('hashed_value')
    })
  })

  test('should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
