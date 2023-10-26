export interface CheckUserByEmailRepository {
  checkByEmail: (
    params: CheckUserByEmailRepository.Params,
  ) => Promise<CheckUserByEmailRepository.Result>
}

export namespace CheckUserByEmailRepository {
  export interface Params {
    email: string
  }

  export type Result = boolean
}

export interface CreateUserRepository {
  createUser: (
    params: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Result>
}

export namespace CreateUserRepository {
  export interface Params {
    name: string
    email: string
    age: number
  }

  export interface Result {
    id: string
    name: string
    email: string
    age: number
  }
}
