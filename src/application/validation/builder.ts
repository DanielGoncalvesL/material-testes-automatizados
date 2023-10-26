import {
  type Validator,
  type Field
} from '@/application/validation'
import { EmailValidator, RequiredFieldValidator } from '@/application/validation'

interface RequiredParams { fields: Field[] }
interface ValidateEmailParams { field: Field }

export class ValidationBuilder {
  private constructor (private readonly validators: Validator[] = []) {}

  static of (): ValidationBuilder {
    return new ValidationBuilder()
  }

  required ({ fields }: RequiredParams): ValidationBuilder {
    this.validators.push(new RequiredFieldValidator(fields))

    return this
  }

  validateEmail ({ field }: ValidateEmailParams): ValidationBuilder {
    this.validators.push(new EmailValidator(field))

    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
