import { type CreateUser, setupCreateUser } from '@/domain/use-cases/create-user'
import { makePgUserRepository } from '@/main/factories/infra/postgres/repositories/user'

export const makeCreateUser = (): CreateUser => {
  return setupCreateUser(
    makePgUserRepository()
  )
}
