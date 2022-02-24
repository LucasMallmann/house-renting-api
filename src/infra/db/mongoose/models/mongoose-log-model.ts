// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface LogErrorModel extends Document {
  stack: string
}

const logErrorSchema = new mongoose.Schema({
  stack: {
    type: String
  }
}, { timestamps: true })

export const LogErrorMongooseModel: Model<LogErrorModel> = mongoose.model('LogError', logErrorSchema)
