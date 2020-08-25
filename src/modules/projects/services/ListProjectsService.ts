import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Project[]> {
    let projects = await this.cacheProvider.recover<Project[]>(
      `projects-list:${user_id}`,
    )

    if (!projects) {
      projects = await this.projectsRepository.findAllProjects(user_id)

      await this.cacheProvider.save(
        `projects-list:${user_id}`,
        classToClass(projects),
      )
    }

    return projects
  }
}

export default ListProjectsService
