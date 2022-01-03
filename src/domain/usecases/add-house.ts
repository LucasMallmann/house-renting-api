import { HouseModel } from '../models/house'

export type AddHouseParams = Omit<HouseModel, 'id'> & {
  images: string[]
  highglightImage: string
}

export interface AddHouse {
  add: (house: AddHouseParams) => Promise<HouseModel>
}
