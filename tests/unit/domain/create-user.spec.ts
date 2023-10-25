describe('Create User', () => {
  it('should call CheckUserByEmailRepository with correct params', async () => {
    const createUser = new CreateUser({ name: 'any_name', email: 'any_email@mail.com', age: 18 })

    const userRepository = new UserRepository(createUser)

    expect(userRepository.checkByEmail).toHaveBeenCalledWith({
      email: 'any_email@mail.com'
    })

    expect(userRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })
})
