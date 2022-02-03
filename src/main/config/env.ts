export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/house-renting-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'j12H~12990wslWQKQW',
  salt: 12,
  uploadsFolder: 'uploads',
  tmpFolder: 'tmp'
}
