/* eslint-disable no-console */
import 'dotenv/config'

import 'reflect-metadata'

import './config/module-alias'
import { env, connectDb } from '@/main/config'

connectDb()
  .then(async () => {
    const { app } = await import('@/main/config/app')

    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`)
    }
    )
  })
  .catch(error => {
    console.error(error)
  })
