import fs from 'fs'
import path from 'path'

import { UploadMultipleFiles } from '@/services/protocols/storage/upload-multiple-files'
import { UploadFile } from '@/presentation/protocols/file'

export class DiskStorageAdapter implements UploadMultipleFiles {
  constructor (
    private readonly tmpFolder: string,
    private readonly uploadFolder: string
  ) {
  }

  saveFiles (files: UploadFile[]): Promise<string[]> {
    files.forEach(async file => {
      const filename = file.filename
      await fs.promises.rename(
        path.resolve(this.tmpFolder, filename),
        path.resolve(this.uploadFolder, filename)
      )
    })
    return Promise.resolve(files.map(file => file.filename))
  }
}
