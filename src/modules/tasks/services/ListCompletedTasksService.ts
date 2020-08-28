import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Task from '../infra/typeorm/entities/Task'
import ITasksRepository from '../repositories/ITasksRepository'

interface IRequest {
  project_id: string
}

@injectable()
class ListCompletedTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Task[]> {
    let completedTasks = await this.cacheProvider.recover<Task[]>(
      `tasks-completed-list:${project_id}`,
    )

    if (!completedTasks) {
      completedTasks = await this.tasksRepository.findCompletedTasks(project_id)

      await this.cacheProvider.save(
        `tasks-completed-list:${project_id}`,
        classToClass(completedTasks),
      )
    }

    return completedTasks
  }
}

export default ListCompletedTasksService
