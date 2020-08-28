import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CompletedTasksController from '../controllers/CompletedTasksController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const tasksRouter = Router()
const completedTasksController = new CompletedTasksController()

tasksRouter.use(ensureAuthenticated)

tasksRouter.get('/:project_id', completedTasksController.index)

tasksRouter.patch(
  '/:id/:project_id',
  celebrate({
    [Segments.BODY]: {
      completed: Joi.boolean().required(),
    },
  }),
  completedTasksController.update,
)

export default tasksRouter
