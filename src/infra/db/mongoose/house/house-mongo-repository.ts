import { HouseModel } from '@/domain/models/house'
import {
  AddHouseRepository,
  AddHouseRepositoryParams
} from '@/services/protocols/db/house/add-house-repository'
import {
  LoadHouseRepositoryQuery,
  LoadHousesRepository
} from '@/services/protocols/db/house/load-houses-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository
implements AddHouseRepository, LoadHousesRepository {
  async addHouse (house: AddHouseRepositoryParams): Promise<HouseModel> {
    const houseDocument = new HouseMongooseModel(house)
    const createdHouse = await houseDocument.save()
    return MongoHelper.withId(createdHouse.toObject({ getters: true }))
  }

  async loadAll (query: LoadHouseRepositoryQuery): Promise<HouseModel[]> {
    const houses = await HouseMongooseModel.find()
      .limit(query.limit)
      .skip(query.limit * (query.page - 1))
      .sort(query.sort)
    return houses.map(house =>
      MongoHelper.withId(house.toObject({ getters: true }))
    )
  }
}
