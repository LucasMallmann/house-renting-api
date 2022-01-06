import { HouseModel } from '@/domain/models/house'
import { AddHouse, AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'

export class DbAddHouse implements AddHouse {
  constructor (private readonly addHouseRepository: AddHouseRepository) {
  }

  async add (house: AddHouseParams): Promise<HouseModel> {
    const createdHouse = await this.addHouseRepository.addHouse(house)
    return createdHouse
  }
}
