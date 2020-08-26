import { injectable, inject } from 'tsyringe'

import Task from '../infra/typeorm/entities/Task'
import ITasksRepository from '../repositories/ITasksRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

@injectable()
class ShowPomoService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Task | undefined> {
    const showPomo = await this.tasksRepository.findById(id)

    if (!showPomo) {
      throw new AppError('Pomo not found', 400)
    }

    return showPomo
  }
}

export default ShowPomoService
