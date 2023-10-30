import { InvalidParamError, RequiredFieldError, ServerError } from '@/application/errors'

describe('HttpErros', () => {
  describe('RequiredFieldError', () => {
    it('should be able to return correct name and message', () => {
      const fieldName = 'any_field'

      const error = new RequiredFieldError(fieldName)

      expect(error.message).toBe(`The field ${fieldName} is required`)
      expect(error.name).toBe('RequiredFieldError')
    })
  })

  describe('InvalidParamError', () => {
    it('should be able to return correct name and message', () => {
      const paramName = 'any_param'

      const error = new InvalidParamError(paramName)

      expect(error.message).toBe(`Invalid param: ${paramName}`)
      expect(error.name).toBe('InvalidParamError')
    })
  })

  describe('ServerError', () => {
    it('should be able to return correct name and message', () => {
      const error = new ServerError()

      expect(error.message).toBe('Server failed. Try again soon')
      expect(error.name).toBe('ServerError')
    })
  })
})
