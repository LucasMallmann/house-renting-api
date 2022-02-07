import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

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
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
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