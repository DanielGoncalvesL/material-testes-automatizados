import { InvalidParamError } from '@/application/errors'
import { EmailValidator } from '@/application/validation'

describe('EmailValidator', () => {
  it('should return InvalidParamError if value is not email format', () => {
    const sut = new EmailValidator({ value: 'any_value', name: 'email' })

    const error = sut.validate()

    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should return undefined if value is correctly', () => {
    const sut = new EmailValidator(
      {
        value: 'any_value@mail.com',
        name: 'any_field'
      }
    )

    const error = sut.validate()

    expect(error).toBe(undefined)
  })
})
