import { InvalidParamError } from '@/application/errors'
import { type Validator, type Field } from '@/application/validation'

export class EmailValidator implements Validator {
  readonly emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  constructor (private readonly email: Field) {}

  validate (): Error | undefined {
    if (!this.emailRegex.test(this.email.value.toString())) {
      return new InvalidParamError(this.email.name)
    }

    return undefined
  }
}
