import { UploadFile } from './file'

export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest {
  body?: any
  headers?: any
  locals?: any
  files?: UploadFile[]
  file?: any
  account?: {
    name: string,
    email: string
  }
}
