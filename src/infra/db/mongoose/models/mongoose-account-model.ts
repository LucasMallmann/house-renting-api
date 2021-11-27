// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface AccountModel extends Document {
  name: string
  email: string
  password: string
  role?: string
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
  }
})

accountSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const AccountMongooseModel: Model<AccountModel> = mongoose.model('Account', accountSchema)