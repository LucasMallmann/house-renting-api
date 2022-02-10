import { HouseModel } from '@/domain/models/house'
import { AddHouseParams } from '@/domain/usecases/add-house'

export type AddHouseRepositoryParams = Omit<AddHouseParams, 'images'> & {
  images: string[]
}

export interface AddHouseRepository {
  addHouse: (house: AddHouseRepositoryParams) => Promise<HouseModel>
}
