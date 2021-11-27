// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface LogErrorModel extends Document {
  stack: string
}

const logErrorSchema = new mongoose.Schema({
  stack: {
    type: String
  }
})

export const LogErrorMongooseModel: Model<LogErrorModel> = mongoose.model('LogError', logErrorSchema)
