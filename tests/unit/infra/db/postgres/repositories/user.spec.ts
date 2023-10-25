import { type IBackup } from 'pg-mem'
import { type Repository } from 'typeorm'
import { validate } from 'uuid'

import { PgUser } from '@/infra/db/postgres/entities/user'
import { PgConnection } from '@/infra/db/postgres/helpers'
import {
  PgUserRepository,
  PgRepository
} from '@/infra/db/postgres/repositories'
import { makeFakeDb } from '@/tests/mocks'

describe('PgUserRepository', () => {
  let sut: PgUserRepository
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()

    const db = await makeFakeDb()

    backup = db.backup()

    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await PgConnection.getInstance().disconnect()
  })

  beforeEach(() => {
    backup.restore()

    sut = new PgUserRepository()
  })

  describe('CheckUserByEmailRepository', () => {
    it('should extend PgRepository', async () => {
      expect(sut).toBeInstanceOf(PgRepository)
    })

    it('should call findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(pgUserRepo, 'findOne')

      await sut.checkByEmail({ email: 'existing_email' })

      expect(findOneSpy).toHaveBeenCalledTimes(1)
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { email: 'existing_email' }
      })
    })

    it('should return true if user exists', async () => {
      await pgUserRepo.save(
        pgUserRepo.create({
          name: 'any_name',
          email: 'existing_email',
          age: 18
        })
      )

      const isExisted = await sut.checkByEmail({ email: 'existing_email' })

      expect(isExisted).toBeTruthy()

      const user = await pgUserRepo.find()

      expect(user).toHaveLength(1)
      expect(user[0]).toHaveProperty('id')
      expect(validate(user[0].id)).toBeTruthy()
      expect(typeof user[0].id).toBe('string')
      expect(user[0]).toHaveProperty('name', 'any_name')
      expect(user[0]).toHaveProperty('email', 'existing_email')
      expect(user[0]).toHaveProperty('age', 18)
      expect(user[0]).toHaveProperty('createdAt')
      expect(user[0]).toHaveProperty('updatedAt')
    })

    it('should return false if user not exists', async () => {
      const isExisted = await sut.checkByEmail({ email: 'existing_email' })

      expect(isExisted).toBeFalsy()
    })
  })

  describe('CreateUserRepository', () => {
    it('should create an user', async () => {
      const { id } = await sut.createUser({
        name: 'any_name',
        email: 'any_email',
        age: 18
      })

      expect(id).toBeTruthy()
      expect(validate(id)).toBeTruthy()
      expect(typeof id).toBe('string')
    })
  })
})
