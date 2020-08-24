import { injectable, inject } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
  name: string
  color: string
  user_id: string
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    id,
    name,
    color,
    user_id,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id)

    if (!project) {
      throw new AppError('Project not found', 400)
    }

    Object.assign(project, { name, color, user_id })

    const updatedProject = await this.projectsRepository.save(project)

    return updatedProject
  }
}

export default UpdateProjectService
