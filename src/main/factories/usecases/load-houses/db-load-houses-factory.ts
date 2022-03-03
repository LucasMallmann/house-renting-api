import { HouseMongoRepository } from '@/infra/db/mongoose/house/house-mongo-repository'
import { LoadHouses } from '@/domain/usecases/load-houses'
import { DbLoadHouses } from '@/services/usecases/load-houses/db-load-houses'

export const makeDbLoadHouses = (): LoadHouses => {
  const houseRepository = new HouseMongoRepository()
  return new DbLoadHouses(houseRepository)
}
