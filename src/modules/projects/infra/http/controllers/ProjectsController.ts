import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateProjectService from '@modules/projects/services/CreateProjectService'
import ListProjectsService from '@modules/projects/services/ListProjectsService'

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, color } = request.body

    const createProject = container.resolve(CreateProjectService)

    const project = await createProject.execute({
      name,
      color,
      user_id,
    })

    return response.json(project)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProjects = container.resolve(ListProjectsService)

    const projects = await listProjects.execute({
      user_id,
    })

    return response.json(projects)
  }
}
