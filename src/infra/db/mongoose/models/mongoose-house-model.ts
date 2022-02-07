// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface HouseModel extends Document {
  city: string
  state: string
  name: string
  location: {
    type: string,
    coordinates: number[]
  }
  address: {
    street: string
    houseNumber: number
    zipCode: string
  }
  images: string[]
  highlightImage: string
}

const AddressSchema = new mongoose.Schema({
  street: String,
  houseNumber: Number,
  zipCode: String
})

const houseSchema = new mongoose.Schema({
  city: {
    type: String
  },
  state: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    type: AddressSchema
  },
  accessToken: {
    type: String
  }
})

export const HouseMongooseModel: Model<HouseModel> = mongoose.model('House', houseSchema)