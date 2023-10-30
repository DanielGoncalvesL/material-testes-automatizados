import { PgConnection } from '@/infra/db/postgres/helpers'
import { DataType, newDb, type IBackup } from 'pg-mem'
import { v4 } from 'uuid'
import { getConnection } from 'typeorm'

export class FakeDb {
  private static instance?: FakeDb
  private backup: IBackup | undefined

  static getInstance (): FakeDb {
    if (FakeDb.instance === undefined) {
      FakeDb.instance = new FakeDb()
    }

    return FakeDb.instance
  }

  private async pgMem (entities?: any[]): Promise<void> {
    const db = newDb()

    const connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: entities ?? ['src/infra/db/postgres/entities/user.ts']
    })

    db.registerExtension('uuid-ossp', schema => {
      schema.registerFunction({
        name: 'uuid_generate_v4',
        returns: DataType.uuid,
        implementation: v4,
        impure: true
      })
    })

    db.public.query('create extension "uuid-ossp"; select uuid_generate_v4();')

    await connection.synchronize()

    await PgConnection.getInstance().connect()

    this.backup = db.backup()
  }

  private async pg (): Promise<void> {
    await PgConnection.getInstance()
      .connect()
      .then(async () => {
        await getConnection().runMigrations()
      })
  }

  private async pgRestore (): Promise<void> {
    const entities = getConnection().entityMetadatas

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name)
      await repository.clear()
    }
  }

  async connect (entities?: any[]): Promise<void> {
    if (process.env.E2E_TESTS != null) {
      await this.pg()
    } else {
      await this.pgMem(entities)
    }
  }

  async restore (): Promise<void> {
    if (process.env.E2E_TESTS != null) {
      await this.pgRestore()
    } else {
      this.backup?.restore()
    }
  }
}
