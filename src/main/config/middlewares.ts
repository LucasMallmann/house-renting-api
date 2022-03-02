import { Express } from 'express'
import { bodyParser, cors, contentType, publicStatic } from '../middlewares'

export default (app: Express): void => {
  app.use('/files', publicStatic)
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
