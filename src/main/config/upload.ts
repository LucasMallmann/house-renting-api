import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import env from '@/main/config/env'

type UploadConfig = {
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder: env.tmpFolder,
  uploadsFolder: env.uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: env.tmpFolder,
      filename (req, file, cb) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return cb(null, fileName)
      }
    })
  },

  config: {
    disk: {},
    aws: {
      bucket: 'house-renting-api'
    }
  }
} as UploadConfig
