import { HouseModel } from '@/domain/models/house'
import { AddHouse, AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'
import { UploadMultipleFiles } from '@/services/protocols/storage/upload-multiple-files'

export class DbAddHouse implements AddHouse {
  constructor (
    private readonly addHouseRepository: AddHouseRepository,
    private readonly uploadMultipleFiles: UploadMultipleFiles
  ) {
  }

  async add (house: AddHouseParams): Promise<HouseModel> {
    const filenames = await this.uploadMultipleFiles.saveFiles(house.images)
    house.images = filenames
    const createdHouse = await this.addHouseRepository.addHouse(house)
    return createdHouse
  }
}
