import { HouseModel } from '@/domain/models/house'
import { AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'
import { HouseMongooseModel } from '../models/mongoose-house-model'

export class HouseMongoRepository implements AddHouseRepository {
  async addHouse (house: AddHouseParams): Promise<HouseModel> {
    try {
      console.log('house: ', house)
      const houseDocument = new HouseMongooseModel(house)
      console.log('houseDocument', houseDocument)
      const createdHouse = await houseDocument.save()
      return { ...house, id: createdHouse._id }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
