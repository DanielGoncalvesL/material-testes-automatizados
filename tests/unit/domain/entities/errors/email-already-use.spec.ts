import { EmailAlreadyUseError } from '@/domain/entities/errors/email-already-use'

describe('EmailAlreadyUseError', () => {
  it('should be able to return correct name and message', () => {
    const error = new EmailAlreadyUseError()

    expect(error.name).toBe('EmailAlreadyUseError')
    expect(error.message).toBe('Create user failed: Email already use')
  })
})
