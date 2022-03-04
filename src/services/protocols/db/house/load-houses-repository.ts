import { HouseModel } from '@/domain/models/house'

export type LoadHouseRepositoryQuery = {
  page: number
  limit: number
  sort: string
}
export interface LoadHousesRepository {
  loadAll: (query: LoadHouseRepositoryQuery) => Promise<HouseModel[]>
}
