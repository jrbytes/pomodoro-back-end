import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateTaskService from '@modules/tasks/services/CreateTaskService'
import ListTasksService from '@modules/tasks/services/ListTasksService'
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService'

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const project_id = request.params.id
    const { name } = request.body

    const createTask = container.resolve(CreateTaskService)

    const task = await createTask.execute({
      name,
      project_id,
    })

    return response.json(task)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const project_id = request.params.id

    const listTasks = container.resolve(ListTasksService)

    const task = await listTasks.execute({
      project_id,
    })

    return response.json(task)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, project_id } = request.params
    const { name } = request.body

    const updateTask = container.resolve(UpdateTaskService)

    const task = await updateTask.execute({
      id,
      name,
      project_id,
    })

    return response.json(task)
  }
}
