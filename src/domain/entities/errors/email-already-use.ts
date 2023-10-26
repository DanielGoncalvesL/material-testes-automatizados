export class EmailAlreadyUseError extends Error {
  constructor () {
    super('Create user failed: Email already use')
    this.name = 'EmailAlreadyUseError'
  }
}
