import { injectable, inject } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IProjectsRepository from '../repositories/IProjectsRepository'

interface IRequest {
  name: string
  color: string
  user_id: string
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, color, user_id }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.create({
      name,
      color,
      user_id,
    })

    await this.cacheProvider.invalidate(`projects-list:${user_id}`)

    return project
  }
}

export default CreateProjectService
