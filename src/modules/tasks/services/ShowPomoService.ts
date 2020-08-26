import { injectable, inject } from 'tsyringe'

import Task from '../infra/typeorm/entities/Task'
import ITasksRepository from '../repositories/ITasksRepository'

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

    return showPomo
  }
}

export default ShowPomoService
