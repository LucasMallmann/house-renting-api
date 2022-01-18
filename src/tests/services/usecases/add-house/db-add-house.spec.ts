
import { HouseModel } from '@/domain/models/house'
import { AddHouseParams } from '@/domain/usecases/add-house'
import { AddHouseRepository } from '@/services/protocols/db/house/add-house-repository'
import { UploadMultipleFiles } from '@/services/protocols/storage/upload-multiple-files'
import { DbAddHouse } from '@/services/usecases/add-house/db-add-house'

const makeFakeHouse = () => {
  const fakeHouse: HouseModel = {
    id: 'any_id',
    name: 'any_name',
    city: 'any_city',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    },
    state: 'any_state',
    address: {
      houseNumber: 0,
      street: 'any_street',
      zipCode: 'any_zipCode'
    },
    images: ['any_created_file'],
    highlightImage: 'any_highlight_image'
  }
  return fakeHouse
}

const makeFakeHouseParams = () => {
  const fakeHouse: AddHouseParams = {
    name: 'any_name',
    city: 'any_city',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    },
    state: 'any_state',
    address: {
      houseNumber: 0,
      street: 'any_street',
      zipCode: 'any_zipCode'
    },
    images: ['any_image'],
    highlightImage: 'any_highlight_image'
  }
  return fakeHouse
}

const makeAddHouseRepository = (): AddHouseRepository => {
  class AddHouseRepositoryStub implements AddHouseRepository {
    async addHouse (house: HouseModel): Promise<HouseModel> {
      return makeFakeHouse()
    }
  }
  return new AddHouseRepositoryStub()
}

const makeUploadFile = (): UploadMultipleFiles => {
  class UploadMultipleFilesStub implements UploadMultipleFiles {
    async saveFiles (files: string[]): Promise<string[]> {
      return ['any_created_file']
    }
  }
  return new UploadMultipleFilesStub()
}

describe('DbAddHouse', () => {
  let sut: DbAddHouse
  let addHouseRepositoryStub: AddHouseRepository
  let uploadFile: UploadMultipleFiles

  beforeEach(() => {
    addHouseRepositoryStub = makeAddHouseRepository()
    uploadFile = makeUploadFile()
    sut = new DbAddHouse(addHouseRepositoryStub, uploadFile)
  })

  test('should call AddHouseRepository with correct values', async () => {
    const addHouseSpy = jest.spyOn(addHouseRepositoryStub, 'addHouse')
    const fakeHouse = makeFakeHouseParams()
    await sut.add(fakeHouse)
    expect(addHouseSpy).toHaveBeenCalledWith(fakeHouse)
  })

  test('should call UploadFile with correct value', async () => {
    const uploadFileSpy = jest.spyOn(uploadFile, 'saveFiles')
    const fakeHouse = makeFakeHouseParams()
    await sut.add(fakeHouse)
    expect(uploadFileSpy).toHaveBeenCalledWith(['any_image'])
  })

  test('should throw if AddHouseRepository throws', async () => {
    jest.spyOn(addHouseRepositoryStub, 'addHouse').mockImplementationOnce(() => {
      throw new Error()
    })
    const addPromise = sut.add(makeFakeHouseParams())
    await expect(addPromise).rejects.toThrow()
  })

  test('should return a house on success', async () => {
    const createdHouse = await sut.add(makeFakeHouseParams())
    await expect(createdHouse).toEqual({
      id: 'any_id',
      name: 'any_name',
      city: 'any_city',
      location: {
        type: 'Point',
        coordinates: [0, 0]
      },
      state: 'any_state',
      address: {
        houseNumber: 0,
        street: 'any_street',
        zipCode: 'any_zipCode'
      },
      images: ['any_created_file'],
      highlightImage: 'any_highlight_image'
    })
  })
})
