import { injectable, inject } from 'tsyringe'

import Task from '../infra/typeorm/entities/Task'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ITasksRepository from '../repositories/ITasksRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
  name: string
  project_id: string
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, name, project_id }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(id)

    if (!task) {
      throw new AppError('Task not found', 400)
    }

    Object.assign(task, { name, project_id })

    const updatedTask = await this.tasksRepository.save(task)

    await this.cacheProvider.invalidate(`tasks-list:${project_id}`)

    return updatedTask
  }
}

export default UpdateTaskService
