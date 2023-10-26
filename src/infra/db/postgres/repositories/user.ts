import {
  type CheckUserByEmailRepository,
  type CreateUserRepository
} from '@/domain/contracts/repositories/user'
import { PgUser } from '@/infra/db/postgres/entities/user'
import { PgRepository } from '@/infra/db/postgres/repositories/repository'

type createParams = CreateUserRepository.Params
type createResult = CreateUserRepository.Result

type checkParams = CheckUserByEmailRepository.Params
type checkResult = CheckUserByEmailRepository.Result

export class PgUserRepository
  extends PgRepository
  implements
    CheckUserByEmailRepository,
    CreateUserRepository {
  async createUser ({
    email,
    name,
    age
  }: createParams): Promise<createResult> {
    const pgUserRepo = this.getRepository(PgUser)

    const user = await pgUserRepo.save(
      pgUserRepo.create({
        name,
        email,
        age
      })
    )

    return { id: user.id, name, email, age }
  }

  async checkByEmail ({ email }: checkParams): Promise<checkResult> {
    const pgUserRepo = this.getRepository(PgUser)

    const isExist = await pgUserRepo.findOne({
      where: { email }
    })

    return !(isExist == null)
  }
}
