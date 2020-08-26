import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import IncrementPomoController from '../controllers/IncrementPomoController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const tasksRouter = Router()
const incrementPomoController = new IncrementPomoController()

tasksRouter.use(ensureAuthenticated)

tasksRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      realized_pomos: Joi.number().required(),
    },
  }),
  incrementPomoController.update,
)

export default tasksRouter
