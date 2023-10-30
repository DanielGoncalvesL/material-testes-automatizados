import { InvalidParamError } from '@/application/errors'
import { EmailValidator } from '@/application/validation'

describe('EmailValidator', () => {
  const emailValue = {
    value: 'any_value@mail.com',
    name: 'any_field'
  }

  it('should return InvalidParamError if value is not email format', () => {
    const sut = new EmailValidator({ value: 'any_value', name: 'email' })

    const error = sut.validate()

    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should ensure that the email regex is valid', () => {
    const sut = new EmailValidator(emailValue)

    expect(sut.emailRegex).toEqual(
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  })

  it('should return undefined if value is correctly', () => {
    const sut = new EmailValidator(emailValue)

    const error = sut.validate()

    expect(error).toBe(undefined)
  })
})
