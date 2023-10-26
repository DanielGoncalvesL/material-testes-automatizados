import { CreateUserController } from '@/application/controllers'
import { EmailValidator, RequiredFieldValidator } from '@/application/validation'
import { EmailAlreadyUseError } from '@/domain/entities/errors/email-already-use'

describe('CreateUserController', () => {
  let sut: CreateUserController
  let createUser: jest.Mock

  const requestData = {
    name: 'any_name',
    email: 'any_email@email.com',
    age: 18
  }

  beforeAll(() => {
    createUser = jest.fn()
    createUser.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      age: 18
    })
  })

  beforeEach(() => {
    sut = new CreateUserController(createUser)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(requestData)

    const { name, email, age } = requestData

    expect(validators).toEqual([
      new RequiredFieldValidator([
        { value: name, name: 'name' },
        { value: email, name: 'email' },
        { value: age, name: 'age' }
      ]),
      new EmailValidator(
        { value: email, name: 'email' }
      )
    ])
  })

  it('should call CreateUser with correct params', async () => {
    await sut.handle(requestData)

    expect(createUser).toBeCalledTimes(1)
    expect(createUser).toBeCalledWith({
      name: requestData.name,
      email: requestData.email,
      age: requestData.age
    })
  })

  it('should return 400 if create user fails', async () => {
    createUser.mockRejectedValueOnce(new EmailAlreadyUseError())

    const httpResponse = await sut.handle(requestData)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EmailAlreadyUseError()
    })
  })

  it('should return 200 if create user succeds', async () => {
    const httpResponse = await sut.handle(requestData)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        age: 18
      }
    })
  })
})
