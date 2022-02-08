import fs from 'fs'
import path from 'path'

import { UploadMultipleFiles } from '@/services/protocols/storage/upload-multiple-files'

export class DiskStorageAdapter implements UploadMultipleFiles {
  constructor (
    private readonly tmpFolder: string,
    private readonly uploadFolder: string
  ) {
  }

  saveFiles (files: string[]): Promise<string[]> {
    files.forEach(async file => {
      await fs.promises.rename(
        path.resolve(this.tmpFolder, file),
        path.resolve(this.uploadFolder, file)
      )
    })
    return Promise.resolve(files)
  }
}
