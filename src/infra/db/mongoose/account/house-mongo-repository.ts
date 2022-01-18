import { HouseModel } from '@/domain/models/house'
import { AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository implements AddHouseRepository {
  async addHouse (house: AddHouseParams): Promise<HouseModel> {
    const houseDocument = new HouseMongooseModel(house)
    const createdHouse = await houseDocument.save()
    return { ...house, id: createdHouse._id }
  }
}
