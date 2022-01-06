import { HouseModel } from '@/domain/models/house'
import { AddHouseParams } from '@/domain/usecases/add-house'

export interface AddHouseRepository {
  addHouse: (house: AddHouseParams) => Promise<HouseModel>
}
