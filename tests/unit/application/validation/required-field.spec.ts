import { RequiredFieldError } from '@/application/errors'
import { RequiredFieldValidator } from '@/application/validation'

describe('RequiredFieldValidator', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredFieldValidator([{ value: '', name: 'any_field' }])

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredFieldValidator([
      { value: null as any, name: 'any_field' }
    ])

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredFieldValidator([
      { value: undefined as any, name: 'any_field' }
    ])

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', () => {
    const sut = new RequiredFieldValidator([
      { value: 'any_value', name: 'any_field' }
    ])

    const error = sut.validate()

    expect(error).toBe(undefined)
  })
})
