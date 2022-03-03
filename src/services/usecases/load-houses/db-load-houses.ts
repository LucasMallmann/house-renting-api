import { HouseModel } from '@/domain/models/house'
import { LoadHouses } from '@/domain/usecases/load-houses'
import { LoadHousesRepository } from '@/services/protocols/db/house/load-houses-repository'

export class DbLoadHouses implements LoadHouses {
  constructor (
    private readonly loadHousesRepository: LoadHousesRepository
  ) {}

  async load (): Promise<HouseModel[] | null> {
    const houses = await this.loadHousesRepository.loadAll()
    return houses
  }
}
