import { UploadMultipleFiles } from '@/services/protocols/storage/upload-multiple-files'

export class DiskStorageAdapter implements UploadMultipleFiles {
  constructor (
    private readonly tmpFolder: string,
    private readonly uploadFolder: string
  ) {}

  saveFiles (files: string[]): Promise<string[]> {
    throw new Error('Method not implemented.')
  }
}
