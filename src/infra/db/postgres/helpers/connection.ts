import {
  createConnection,
  getConnection,
  getConnectionManager,
  type ObjectType,
  type Repository,
  type Connection,
  getRepository,
  type ObjectLiteral
} from 'typeorm'
import {
  PgConnectionNotFoundError
} from '@/infra/db/postgres/helpers'

export class PgConnection {
  private static instance?: PgConnection

  private connection?: Connection

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection()
    }

    return PgConnection.instance
  }

  async connect (): Promise<void> {
    this.connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()
  }

  async disconnect (): Promise<void> {
    if (this.connection === undefined) {
      throw new PgConnectionNotFoundError()
    }

    await getConnection().close()

    this.connection = undefined
  }

  getRepository<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) {
      throw new PgConnectionNotFoundError()
    }

    return getRepository(entity)
  }
}
