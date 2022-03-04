import { HouseModel } from '@/domain/models/house'
import { LoadHouseQuery, LoadHouses } from '@/domain/usecases/load-houses'
import { LoadHousesRepository } from '@/services/protocols/db/house/load-houses-repository'

export class DbLoadHouses implements LoadHouses {
  constructor (
    private readonly loadHousesRepository: LoadHousesRepository
  ) {}

  async load (query: LoadHouseQuery = {}): Promise<HouseModel[] | null> {
    const { limit = 10, page = 1, sort = 'createdAt' } = query
    const houses = await this.loadHousesRepository.loadAll({
      limit,
      page,
      sort
    })
    return houses
  }
}
