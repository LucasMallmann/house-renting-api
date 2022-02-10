import { UploadFile } from '@/presentation/protocols/file'
import { HouseModel } from '../models/house'

export type AddHouseParams = Omit<HouseModel, 'id' | 'images'> & {
  images?: UploadFile[]
}
export interface AddHouse {
  add: (house: AddHouseParams) => Promise<HouseModel>
}
