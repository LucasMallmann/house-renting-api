import { HouseModel } from '@/domain/models/house'
// import { AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository, AddHouseRepositoryParams } from '@/services/protocols/db/house/add-house-repository'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository implements AddHouseRepository {
  async addHouse (house: AddHouseRepositoryParams): Promise<HouseModel> {
    try {
      const houseDocument = new HouseMongooseModel(house)
      const createdHouse = await houseDocument.save()
      return { ...house, id: createdHouse._id }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
