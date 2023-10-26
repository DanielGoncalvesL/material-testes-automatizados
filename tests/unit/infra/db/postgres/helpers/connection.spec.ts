import { mocked } from 'jest-mock'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository
} from 'typeorm'
import {
  PgConnection,
  PgConnectionNotFoundError
} from '@/infra/db/postgres/helpers'

@Entity({ name: 'test' })
export class PgTest {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column({ nullable: false })
    any_key!: string
}

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn(),
  ManyToMany: jest.fn(),
  JoinTable: jest.fn()
}))

describe('PgConnection', () => {
  let getConnectionManagerSpy: jest.Mock
  let createConnectionSpy: jest.Mock
  let getConnectionSpy: jest.Mock
  let hasSpy: jest.Mock
  let closeSpy: jest.Mock
  let getRepositorySpy: jest.Mock
  let sut: PgConnection

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true)

    getConnectionManagerSpy = jest.fn().mockReturnValue({
      has: hasSpy
    })

    getRepositorySpy = jest.fn().mockReturnValue('any_repo')

    createConnectionSpy = jest.fn()

    closeSpy = jest.fn()

    getConnectionSpy = jest.fn().mockReturnValue({
      close: closeSpy
    })

    mocked(createConnection).mockImplementation(createConnectionSpy)
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    mocked(getConnection).mockImplementation(getConnectionSpy)
    mocked(getRepository).mockImplementation(getRepositorySpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('should have only one instance', () => {
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })

  it('should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false)

    await sut.connect()

    expect(createConnectionSpy).toBeCalledWith()
    expect(createConnectionSpy).toBeCalledTimes(1)

    expect(hasSpy).toBeCalledTimes(1)
    expect(hasSpy).toBeCalledWith('default')
  })

  it('should use an existing connection', async () => {
    await sut.connect()

    expect(getConnectionSpy).toBeCalledWith()
    expect(getConnectionSpy).toBeCalledTimes(1)
  })

  it('should close connection', async () => {
    await sut.connect()
    await sut.disconnect()

    expect(closeSpy).toBeCalledWith()
    expect(closeSpy).toBeCalledTimes(1)
  })

  it('should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
    const promise = sut.disconnect()

    expect(closeSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new PgConnectionNotFoundError())
  })

  it('should get repository', async () => {
    await sut.connect()
    const repository = sut.getRepository(PgTest)

    expect(getRepositorySpy).toBeCalledWith(PgTest)
    expect(getRepositorySpy).toBeCalledTimes(1)
    expect(repository).toBe('any_repo')

    await sut.disconnect()
  })

  it('should return ConnectionNotFoundError on getRepository if connection is not found', async () => {
    expect(getRepositorySpy).not.toHaveBeenCalled()
    expect(() => sut.getRepository(PgTest)).toThrow(
      new PgConnectionNotFoundError()
    )
  })
})
