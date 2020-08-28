import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCompletedTasksService from '@modules/tasks/services/ListCompletedTasksService'
import UpdateCompletedTaskService from '@modules/tasks/services/UpdateCompletedTaskService'

export default class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const project_id = request.params.project_id

    const listCompletedTasks = container.resolve(ListCompletedTasksService)

    const task = await listCompletedTasks.execute({
      project_id,
    })

    return response.json(task)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, project_id } = request.params
    const { completed } = request.body

    const updateCompletedTask = container.resolve(UpdateCompletedTaskService)

    const task = await updateCompletedTask.execute({
      id,
      completed,
      project_id,
    })

    return response.json(task)
  }
}
