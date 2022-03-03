import { Router } from 'express'
import { upload } from '../middlewares'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeAddHouseController } from '../factories/controllers/house/add-house/add-house-controller-factory'
import { makeLoadHousesController } from '../factories/controllers/house/load-houses/load-houses-controller-factory'

export default (router: Router): void => {
  router.post('/houses', auth, upload.array('files', 12), adaptRoute(makeAddHouseController()))
  router.get('/houses', auth, adaptRoute(makeLoadHousesController()))
}
