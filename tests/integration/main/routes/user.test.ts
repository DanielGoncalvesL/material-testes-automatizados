import request from 'supertest'

import { FakeDb } from '@/../tests/mocks'
import { PgConnection } from '@/infra/db/postgres/helpers'
import { app } from '@/main/config/app'

describe('UserRoutes', () => {
  beforeAll(async () => {
    await FakeDb.getInstance().connect()
  })

  afterAll(async () => {
    await PgConnection.getInstance().disconnect()
  })

  beforeEach(async () => {
    await FakeDb.getInstance().restore()
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
          .post('/api/create-user')
          .send(requestData)
          .expect(200)

        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('name')
        expect(body).toHaveProperty('email')
        expect(body).toHaveProperty('age')
      })

      it('should return 400 if email already exists', async () => {
        await request(app).post('/api/create-user').send(requestData).expect(200)

        const { body } = await request(app)
          .post('/api/create-user')
          .send(requestData)
          .expect(400)

        expect(body).toEqual({
          error: 'Create user failed: Email already use'
        })
      })
    })
  })
})
