import Task from '../infra/typeorm/entities/Task'
import ICreateTasksDTO from '../dtos/ICreateTasksDTO'

export default interface ITasksRepository {
  findAllTasks(id: string): Promise<Task[]>
  findById(id: string): Promise<Task | undefined>
  create(data: ICreateTasksDTO): Promise<Task>
  save(task: Task): Promise<Task>
  delete(task: Task): Promise<Task | {}>
}
