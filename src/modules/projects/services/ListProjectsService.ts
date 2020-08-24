import { injectable, inject } from 'tsyringe'

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
  ) {}

  public async execute({ user_id }: IRequest): Promise<Project[]> {
    const projects = await this.projectsRepository.findAllById(user_id)

    return projects
  }
}

export default ListProjectsService
