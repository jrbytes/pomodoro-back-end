import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import TasksController from '../controllers/TasksController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const tasksRouter = Router()
const tasksController = new TasksController()

tasksRouter.use(ensureAuthenticated)

tasksRouter.post(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  tasksController.create,
)

tasksRouter.get('/:id', tasksController.index)

tasksRouter.patch(
  '/:id/:project_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  tasksController.update,
)

export default tasksRouter
