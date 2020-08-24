import { getRepository, Repository } from 'typeorm'

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository'
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectsDTO'

import Project from '../entities/Project'

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>

  constructor() {
    this.ormRepository = getRepository(Project)
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id)

    return project
  }

  public async findAllById(id: string): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      where: { user_id: id },
    })

    return projects
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectData)

    await this.ormRepository.save(project)

    return project
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project)
  }
}

export default ProjectsRepository
