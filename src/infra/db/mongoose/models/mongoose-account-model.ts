// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface AccountModel extends Document {
  name: string
  email: string
  password: string
  role?: string
  accessToken?: string
}

const accountSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  accessToken: {
    type: String
  }
})

export const AccountMongooseModel: Model<AccountModel> = mongoose.model('Account', accountSchema)
