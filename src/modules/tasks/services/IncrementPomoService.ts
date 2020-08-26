import { injectable, inject } from 'tsyringe'

import Task from '../infra/typeorm/entities/Task'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ITasksRepository from '../repositories/ITasksRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
  realized_pomos: number
}

@injectable()
class IncrementPomoService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, realized_pomos }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(id)

    if (!task) {
      throw new AppError('Task not found', 400)
    }

    Object.assign(task, { realized_pomos })

    const updatedTask = await this.tasksRepository.save(task)

    await this.cacheProvider.invalidate(`tasks-list:${task.project_id}`)

    return updatedTask
  }
}

export default IncrementPomoService
