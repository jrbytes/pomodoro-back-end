import { injectable, inject } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

    await this.cacheProvider.invalidate(`projects-list:${user_id}`)

    return updatedProject
  }
}

export default UpdateProjectService
