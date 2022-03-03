import { HouseModel } from '@/domain/models/house'

export interface LoadHousesRepository {
  loadAll: () => Promise<HouseModel[]>
}
