import { HouseModel } from '../models/house'

export type AddHouseParams = {
  name: string
  email: string,
  password: string
  role?: string
}

export interface AddHouse {
  add: (house: AddHouseParams) => Promise<HouseModel>
}
