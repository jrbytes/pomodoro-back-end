import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes'
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes'
import pomosRouter from '@modules/tasks/infra/http/routes/pomos.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

routes.use('/projects', projectsRouter)
routes.use('/tasks', tasksRouter)
routes.use('/pomos', pomosRouter)

export default routes
