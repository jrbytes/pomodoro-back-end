import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      default_minute: Joi.number().required(),
      setting_progress_bar: Joi.boolean().required(),
      theme: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
)

export default profileRouter
