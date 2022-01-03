import { HouseModel } from '../models/house'

export type AddHouseParams = Omit<HouseModel, 'id'>
export interface AddHouse {
  add: (house: AddHouseParams) => Promise<HouseModel>
}
