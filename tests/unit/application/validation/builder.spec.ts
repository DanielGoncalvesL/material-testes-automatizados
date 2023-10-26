import { RequiredFieldValidator } from '@/application/validation'
import { ValidationBuilder } from '@/application/validation/builder'

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder.of()
      .required({
        fields: [{ value: 'any_value', name: 'any_name' }]
      })
      .build()

    expect(validators).toEqual([
      new RequiredFieldValidator([{ value: 'any_value', name: 'any_name' }])
    ])
  })
})
