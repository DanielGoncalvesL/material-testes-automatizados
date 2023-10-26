import { RequiredFieldError } from '@/application/errors'
import { type Validator } from '@/application/validation'
import { type Field } from '@/application/validation/field'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly fields: Field[]) {}

  validate (): Error | undefined {
    for (const field of this.fields) {
      if (
        field.value === '' ||
        field.value === null ||
        field.value === undefined
      ) {
        return new RequiredFieldError(field.name)
      }
    }

    return undefined
  }
}
