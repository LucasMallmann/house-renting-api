import { DiskStorageAdapter } from '@/infra/storage/disk/disk-storage-adapter'

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

describe('Disk Storage Adapter', () => {
  test('should call fs.rename and path.resolve with correct values', async () => {
    const sut = makeSut()
    await sut.saveFiles(['file1.jpg', 'file2.jpg'])
    expect(fs.promises.rename).toHaveBeenCalled()
    expect(path.resolve).toHaveBeenCalled()
  })
})
