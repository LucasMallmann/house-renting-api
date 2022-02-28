// Post.ts
import mongoose, { Document, Model } from 'mongoose'

interface HouseModel extends Document {
  city: string;
  state: string;
  name: string;
  location: {
    type: string;
    coordinates: number[];
  };
  address: {
    street: string;
    houseNumber: number;
    zipCode: string;
  };
  images: string[];
  highlightImage: string;
  createdAt: Date;
  price: number
}

const AddressSchema = new mongoose.Schema({
  street: String,
  houseNumber: Number,
  zipCode: String
}, {
  _id: false
})

const LocationSchema = new mongoose.Schema({
  type: String,
  coordinates: [Number]
}, {
  _id: false
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
  location: {
    type: LocationSchema
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date
  }
}, {
  timestamps: true
})

export const HouseMongooseModel: Model<HouseModel> = mongoose.model(
  'House',
  houseSchema
)
