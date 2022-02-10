import { UploadFile } from '@/presentation/protocols/file'

export interface UploadMultipleFiles {
  saveFiles(files?: UploadFile[]): Promise<string[]>
}
