import { HouseModel } from '@/domain/models/house'
import {
  AddHouseRepository,
  AddHouseRepositoryParams
} from '@/services/protocols/db/house/add-house-repository'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository implements AddHouseRepository {
  async addHouse (house: AddHouseRepositoryParams): Promise<HouseModel> {
    const houseDocument = new HouseMongooseModel(house)
    const createdHouse = await houseDocument.save()
    const { _id, __v, ...houseData } = createdHouse.toObject()
    return { id: _id, ...houseData }
  }
}
