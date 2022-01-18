export interface UploadMultipleFiles {
  saveFiles(files: string[]): Promise<string[]>
}
