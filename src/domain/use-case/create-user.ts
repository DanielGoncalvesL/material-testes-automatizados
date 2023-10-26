import { EmailAlreadyUseError } from '@/domain/entities/errors/email-already-use'
import {
  type CheckUserByEmailRepository,
  type CreateUserRepository
} from '@/domain/contracts/repositories/user'

export type CreateUser = (params: {
  email: string
  name: string
  age: number
}) => Promise<{
  id: string
  name: string
  email: string
  age: number
}>

type Setup = (
  userRepository: CheckUserByEmailRepository & CreateUserRepository,
) => CreateUser

export const setupCreateUser: Setup =
  (userRepository) =>
    async ({ name, email, age }) => {
      const userExists = await userRepository.checkByEmail({
        email
      })

      if (userExists) {
        throw new EmailAlreadyUseError()
      }

      const { id } = await userRepository.createUser({
        email,
        name,
        age
      })

      return {
        id,
        name,
        email,
        age
      }
    }
