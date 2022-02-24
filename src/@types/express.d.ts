import { ObjectId } from 'mongoose'

// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    accountId: ObjectId
  }
}
