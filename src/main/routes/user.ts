import { type Router } from 'express'
import {
  makeCreateUserController
} from '@/main/factories/application/controllers/create-user'
import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'

const createUserController = makeCreateUserController()

export default (router: Router): void => {
  router.post('/create-user', adapt(createUserController))
}
