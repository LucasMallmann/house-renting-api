import { Router } from 'express'
import { upload } from '../middlewares'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddHouseController } from '../factories/controllers/house/add-house/add-house-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/houses', auth, upload.array('files', 12), adaptRoute(makeAddHouseController()))
}
