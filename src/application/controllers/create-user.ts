import { type CreateUser } from '@/domain/use-cases/create-user'
import { badRequest, type HttpResponse, ok } from '@/application/helpers/http'
import { ValidationBuilder, type Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'

interface HttpRequest {
  name: string
  email: string
  age: number
}

type Model = Error | {
  id: string
  name: string
  email: string
  age: number
}

export class CreateUserController extends Controller {
  constructor (private readonly createUser: CreateUser) {
    super()
  }

  async perform ({
    email,
    name,
    age
  }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const userData = await this.createUser({
        email,
        name,
        age
      })

      return ok(userData)
    } catch (error) {
      return badRequest(error as Error)
    }
  }

  override buildValidators ({
    email,
    name,
    age
  }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of()
        .required({
          fields: [
            { value: name, name: 'name' },
            { value: email, name: 'email' },
            { value: age, name: 'age' }
          ]
        })
        .build(),

      ...ValidationBuilder.of()
        .validateEmail({ field: { value: email, name: 'email' } })
        .build()
    ]

    return validators
  }
}
