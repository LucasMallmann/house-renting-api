import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddHouseController } from '../factories/controllers/house/add-house/add-house-controller-factory'

export default (router: Router): void => {
  router.post('/houses', adaptRoute(makeAddHouseController()))
}
