import { PgConnection } from '@/infra/db/postgres/helpers'
import { getConnection } from 'typeorm'

export const connectDb = async (): Promise<void> => {
  await Promise.all([
    PgConnection.getInstance()
      .connect()
      .then(async () => {
        await getConnection().runMigrations()
      })
  ])
}
