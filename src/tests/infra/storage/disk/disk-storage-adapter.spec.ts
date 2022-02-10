import { DiskStorageAdapter } from '@/infra/storage/disk/disk-storage-adapter'
import { UploadFile } from '@/presentation/protocols/file'

import fs from 'fs'
import path from 'path'

jest.mock('fs', () => ({
  promises: {
    rename: jest.fn().mockResolvedValue('')
  }
}))

jest.mock('path', () => ({
  resolve: jest.fn()
}))

const makeSut = () => {
  return new DiskStorageAdapter('tmp', 'uploads')
}

const fakeFile: UploadFile = {
  destination: 'any_destination',
  encoding: 'any_encoding',
  fieldname: 'any_fieldname',
  filename: 'any_filename',
  mimetype: 'any_mimetype',
  originalname: 'any_originalname',
  path: 'any_path',
  size: 0
}

describe('Disk Storage Adapter', () => {
  test('should call fs.rename and path.resolve with correct values', async () => {
    const sut = makeSut()
    await sut.saveFiles([fakeFile])
    expect(fs.promises.rename).toHaveBeenCalled()
    expect(path.resolve).toHaveBeenCalled()
  })
})
