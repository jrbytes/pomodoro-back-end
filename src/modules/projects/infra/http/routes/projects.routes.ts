import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProjectsController from '../controllers/ProjectsController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const projectsRouter = Router()
const projectsController = new ProjectsController()

projectsRouter.use(ensureAuthenticated)

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      color: Joi.string().required(),
    },
  }),
  projectsController.create,
)

projectsRouter.get('/', projectsController.index)

projectsRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      color: Joi.string().required(),
    },
  }),
  projectsController.update,
)

export default projectsRouter
