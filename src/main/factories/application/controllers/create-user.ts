import { type Controller, CreateUserController } from '@/application/controllers'
import { makeCreateUser } from '@/main/factories/use-cases/create-user'

export const makeCreateUserController = (): Controller => {
  const createUser = makeCreateUser()

  const controller = new CreateUserController(createUser)

  return controller
}
