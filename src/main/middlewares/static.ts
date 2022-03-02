import express from 'express'
import env from '@/main/config/env'

export const publicStatic = express.static(env.uploadsFolder)
