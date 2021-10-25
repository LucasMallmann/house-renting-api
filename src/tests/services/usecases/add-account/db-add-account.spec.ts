import { AddAccountParams } from '@/domain/usecases/add-account'
import { Hasher } from '@/services/protocols/hasher'
import { DbAddAccount } from '@/services/usecases/add-account/db-add-account'

const makeFakeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('any_hashed')
    }
  }
  return new HasherStub()
}

const makeFakeAccount = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  role: 'any_role'
})

describe('DbAddAccount', () => {
  let sut: DbAddAccount
  let hasherStub: Hasher

  beforeEach(() => {
    hasherStub = makeFakeHasher()
    sut = new DbAddAccount(hasherStub)
  })
  test('should call Hasher with correct value', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAccount())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const addAccountPromise = sut.add(makeFakeAccount())
    await expect(addAccountPromise).rejects.toThrow()
  })
})
