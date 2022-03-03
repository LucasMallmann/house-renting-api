// Post.ts
import mongoose, { Document, Model } from 'mongoose'
import env from '@/main/config/env'

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
  price: number;
  owner: {
    name: string;
    email: string;
  };
  getHouseImages: () => string[];
}

const AddressSchema = new mongoose.Schema(
  {
    street: String,
    houseNumber: Number,
    zipCode: String
  },
  {
    _id: false
  }
)

const LocationSchema = new mongoose.Schema(
  {
    type: String,
    coordinates: [Number]
  },
  {
    _id: false
  }
)

const OwnerSchema = new mongoose.Schema(
  {
    name: String,
    email: String
  },
  {
    _id: false
  }
)

const houseSchema = new mongoose.Schema(
  {
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
    },
    images: {
      type: [String],
      get: (images: string[]) => {
        if (!images) {
          return []
        }
        switch (env.driver) {
          case 'disk':
            return images.map(image => `${env.appUrl}/files/${image}`)
          case 's3':
            return images.map(image => `${env.appUrl}/files/${image}`)
          default:
            return []
        }
      }
    },
    owner: OwnerSchema
  },
  {
    timestamps: true
  }
)

export const HouseMongooseModel: Model<HouseModel> = mongoose.model(
  'House',
  houseSchema
)
