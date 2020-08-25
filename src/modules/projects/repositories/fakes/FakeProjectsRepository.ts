import { uuid } from 'uuidv4'

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository'
import ICreateProjectsDTO from '@modules/projects/dtos/ICreateProjectsDTO'

import Project from '@modules/projects/infra/typeorm/entities/Project'

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = []

  public async findById(id: string): Promise<Project | undefined> {
    const findProject = this.projects.find(projects => projects.id === id)

    return findProject
  }

  public async findAllProjects(user_id: string): Promise<Project[]> {
    const findById = this.projects.filter(
      projects => projects.user_id === user_id,
    )

    return findById
  }

  public async create(projectData: ICreateProjectsDTO): Promise<Project> {
    const project = new Project()

    Object.assign(project, { id: uuid() }, projectData)

    this.projects.push(project)

    return project
  }

  public async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      findProject => findProject.id === project.id,
    )

    this.projects[findIndex] = project

    return project
  }
}

export default FakeProjectsRepository
