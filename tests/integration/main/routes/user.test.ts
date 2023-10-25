import request from 'supertest'
import { type IBackup } from 'pg-mem'

import { makeFakeDb } from '@/../tests/mocks'
import { PgConnection } from '@/infra/db/postgres/helpers'
import { app } from '@/main/config/app'

describe('UserRoutes', () => {
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb()

    backup = db.backup()
  })

  afterAll(async () => {
    await PgConnection.getInstance().disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })
  describe('CreateUser', () => {
    describe('POST /create-user', () => {
      const requestData = {
        name: 'any_name',
        email: 'any_email@email.com',
        age: 18
      }

      it('should return 200 with AccessToken', async () => {
        const { body } = await request(app)
          .post('/api/signup')
          .send(requestData)
          .expect(200)

        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('name')
        expect(body).toHaveProperty('email')
        expect(body).toHaveProperty('age')
      })

      it('should return 401 if email already exists', async () => {
        await request(app).post('/api/signup').send(requestData).expect(200)

        const { body } = await request(app)
          .post('/api/signup')
          .send(requestData)
          .expect(400)

        expect(body).toEqual({
          error: 'SignUp failed: Email already use'
        })
      })
    })
  })
})
