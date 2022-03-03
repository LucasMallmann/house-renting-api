import { HouseModel } from '@/domain/models/house'
import {
  AddHouseRepository,
  AddHouseRepositoryParams
} from '@/services/protocols/db/house/add-house-repository'
import { LoadHousesRepository } from '@/services/protocols/db/house/load-houses-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository
implements AddHouseRepository, LoadHousesRepository {
  async addHouse (house: AddHouseRepositoryParams): Promise<HouseModel> {
    const houseDocument = new HouseMongooseModel(house)
    const createdHouse = await houseDocument.save()
    return {
      ...MongoHelper.withId(createdHouse.toObject()),
      images: createdHouse.getHouseImages()
    }
  }

  async loadAll (): Promise<HouseModel[]> {
    const houses = await HouseMongooseModel.find()
    return houses.map(house => {
      return {
        ...MongoHelper.withId(house.toObject()),
        images: house.getHouseImages()
      }
    })
  }
}
