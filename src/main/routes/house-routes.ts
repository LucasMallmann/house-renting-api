import { Router } from 'express'
import { upload } from '../middlewares'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddHouseController } from '../factories/controllers/house/add-house/add-house-controller-factory'
import { authAdmin } from '../middlewares/auth-admin'

export default (router: Router): void => {
  router.post('/houses', authAdmin, upload.array('files', 12), adaptRoute(makeAddHouseController()))
}
