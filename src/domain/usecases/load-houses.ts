import { HouseModel } from '../models/house'

export type LoadHouseQuery = {
  page?: number
  limit?: number
  sort?: string
}
export interface LoadHouses {
  load: (query?: LoadHouseQuery) => Promise<HouseModel[] | null>
}
