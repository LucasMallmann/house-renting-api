import path from 'path'

const uploadsFolder = path.resolve(__dirname, '..', '..', '..', 'uploads')
const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp')

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/house-renting-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'j12H~12990wslWQKQW',
  salt: 12,
  uploadsFolder,
  tmpFolder,
  env: process.env.NODE_ENV ?? 'development',
  driver: process.env.STORAGE_DRIVER ?? 'disk',
  appUrl: process.env.APP_URL ?? 'http://localhost:5050'
}
