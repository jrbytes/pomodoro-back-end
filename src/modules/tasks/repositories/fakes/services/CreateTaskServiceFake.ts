import { injectable, inject } from 'tsyringe'

import Task from '@modules/tasks/infra/typeorm/entities/Task'
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository'

interface IRequest {
  name: string
  project_id: string
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ name, project_id }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.create({
      name,
      project_id,
    })

    return task
  }
}

export default CreateTaskService
