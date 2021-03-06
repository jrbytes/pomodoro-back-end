import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository'
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository'

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository'
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
)

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
)
