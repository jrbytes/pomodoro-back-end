import { injectable, inject } from 'tsyringe'

import Task from '../infra/typeorm/entities/Task'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ITasksRepository from '../repositories/ITasksRepository'

interface IRequest {
  name: string
  project_id: string
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, project_id }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.create({
      name,
      realized_pomos: 0,
      project_id,
    })

    await this.cacheProvider.invalidate(`tasks-list:${project_id}`)

    return task
  }
}

export default CreateTaskService
