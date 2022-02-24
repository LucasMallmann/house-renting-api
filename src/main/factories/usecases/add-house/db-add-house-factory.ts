import env from '@/main/config/env'
import { AddHouse } from '@/domain/usecases/add-house'
import { HouseMongoRepository } from '@/infra/db/mongoose/house/house-mongo-repository'
import { DiskStorageAdapter } from '@/infra/storage/disk/disk-storage-adapter'
import { DbAddHouse } from '@/services/usecases/add-house/db-add-house'

export const makeDbAddHouse = (): AddHouse => {
  const houseRepository = new HouseMongoRepository()
  const diskStorageAdapter = new DiskStorageAdapter(env.tmpFolder, env.uploadsFolder)
  const dbAddHouse = new DbAddHouse(houseRepository, diskStorageAdapter)
  return dbAddHouse
}
