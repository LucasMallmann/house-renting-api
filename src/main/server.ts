
import { MongoHelper } from '@/infra/db/mongoose/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default

  app.listen(env.port, () => {
    console.log(`Server runnint at http://localhost:${env.port}`)
  })
}).catch(error => console.error(error))
