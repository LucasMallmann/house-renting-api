import { HouseModel } from '@/domain/models/house'
// import { AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository, AddHouseRepositoryParams } from '@/services/protocols/db/house/add-house-repository'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository implements AddHouseRepository {
  async addHouse (house: AddHouseRepositoryParams): Promise<HouseModel> {
    const houseDocument = new HouseMongooseModel(house)
    const createdHouse = await houseDocument.save()
    return {
      id: createdHouse._id,
      address: createdHouse.address,
      city: createdHouse.city,
      createdAt: createdHouse.createdAt,
      highlightImage: createdHouse.highlightImage,
      images: createdHouse.images,
      location: {
        coordinates: createdHouse.location.coordinates,
        type: createdHouse.location.type
      },
      name: createdHouse.name,
      state: createdHouse.state,
      price: createdHouse.price
    }
  }
}
