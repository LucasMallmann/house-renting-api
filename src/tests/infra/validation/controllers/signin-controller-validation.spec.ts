import { SigninControllerValidation } from '@/infra/validation/controllers'

const makeSut = () => {
  return new SigninControllerValidation()
}

describe('SignIn Controller Validation', () => {
  test('should return error if validation fails', async () => {
    const sut = makeSut()
    const notValidObject = {}
    const error = await sut.validate(notValidObject)
    expect(error).toBeTruthy()
  })

  test('should not return error if validation succeeds', async () => {
    const sut = makeSut()
    const validObject = {
      email: 'valid_email@gmail.com',
      password: '123456'
    }
    const error = await sut.validate(validObject)
    expect(error).toBeUndefined()
  })
})
