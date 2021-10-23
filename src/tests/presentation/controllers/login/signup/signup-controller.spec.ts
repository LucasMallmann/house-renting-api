import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'

describe('SignupController', () => {
  let sut: SignupController

  beforeEach(() => {
    sut = new SignupController()
  })

  test('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {}
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })
})
