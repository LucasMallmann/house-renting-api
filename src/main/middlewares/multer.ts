import multer from 'multer'
import uploadConfig from '../config/upload'

export const upload = multer(uploadConfig.multer)
