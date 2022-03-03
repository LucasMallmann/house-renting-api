import { HouseModel } from '../models/house'

export interface LoadHouses {
  load: () => Promise<HouseModel[] | null>
}
