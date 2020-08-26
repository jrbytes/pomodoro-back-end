import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Task from '../infra/typeorm/entities/Task'
import ITasksRepository from '../repositories/ITasksRepository'

interface IRequest {
  project_id: string
}

@injectable()
class ListTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Task[]> {
    let tasks = await this.cacheProvider.recover<Task[]>(
      `tasks-list:${project_id}`,
    )

    if (!tasks) {
      tasks = await this.tasksRepository.findAllTasks(project_id)

      await this.cacheProvider.save(
        `tasks-list:${project_id}`,
        classToClass(tasks),
      )
    }

    return tasks
  }
}

export default ListTasksService
