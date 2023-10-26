import { type CheckUserByEmailRepository, type CreateUserRepository } from '@/domain/contracts/repositories/user'
import { EmailAlreadyUseError } from '@/domain/entities/errors/email-already-use'
import { setupCreateUser, type CreateUser } from '@/domain/use-cases/create-user'
import { throwError } from '@/tests/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateUser', () => {
  let userRepository: MockProxy <CheckUserByEmailRepository & CreateUserRepository>

  let sut: CreateUser

  const userDatas = {
    name: 'any_name',
    email: 'any_mail',
    age: 18
  }

  beforeEach(() => {
    userRepository = mock()

    userRepository.checkByEmail.mockResolvedValue(false)

    userRepository.createUser.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_mail',
      age: 18
    })

    sut = setupCreateUser(userRepository)
  })

  it('should call CheckUserByEmailRepository with correct params', async () => {
    await sut(userDatas)

    expect(userRepository.checkByEmail).toBeCalledWith({
      email: userDatas.email
    })

    expect(userRepository.checkByEmail).toBeCalledTimes(1)
  })

  it('should throw EmailAlreadyUserError when CheckUserByEmailRepository returns data', async () => {
    userRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut(userDatas)

    await expect(promise).rejects.toThrow(new EmailAlreadyUseError())
  })

  it('should throw if CheckUserByEmailRepository throws', async () => {
    userRepository.checkByEmail.mockImplementationOnce(throwError)

    const promise = sut(userDatas)

    await expect(promise).rejects.toThrow()
  })

  it('should call CreateUserRepository with correct params', async () => {
    await sut(userDatas)

    expect(userRepository.createUser).toBeCalledWith({
      name: userDatas.name,
      email: userDatas.email,
      age: userDatas.age
    })

    expect(userRepository.checkByEmail).toBeCalledTimes(1)
  })

  it('should throw if CreateUserRepository throws', async () => {
    userRepository.createUser.mockImplementationOnce(throwError)

    const promise = sut(userDatas)

    await expect(promise).rejects.toThrow()
  })

  it('should return user datas with success', async () => {
    const createUserResult = await sut(userDatas)

    expect(createUserResult).toEqual({
      id: 'any_id',
      name: userDatas.name,
      email: userDatas.email,
      age: userDatas.age
    })
  })
})
