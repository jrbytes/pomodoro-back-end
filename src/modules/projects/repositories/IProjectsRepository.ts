import Project from '../infra/typeorm/entities/Project'
import ICreateProjectsDTO from '../dtos/ICreateProjectsDTO'

export default interface IProjectsRepository {
  findAllProjects(id: string): Promise<Project[]>
  findById(id: string): Promise<Project | undefined>
  create(data: ICreateProjectsDTO): Promise<Project>
  save(project: Project): Promise<Project>
}
