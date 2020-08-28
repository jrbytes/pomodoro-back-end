import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes'
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes'
import pomosRouter from '@modules/tasks/infra/http/routes/pomos.routes'
import completedTasksRouter from '@modules/tasks/infra/http/routes/completedtasks.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

routes.use('/projects', projectsRouter)
routes.use('/tasks', tasksRouter)
routes.use('/pomos', pomosRouter)
routes.use('/completed-tasks', completedTasksRouter)

export default routes
