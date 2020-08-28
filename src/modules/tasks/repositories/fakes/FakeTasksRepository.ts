import { uuid } from 'uuidv4'

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository'
import ICreateTasksDTO from '@modules/tasks/dtos/ICreateTasksDTO'

import Task from '@modules/tasks/infra/typeorm/entities/Task'

class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = []

  public async findById(id: string): Promise<Task | undefined> {
    const findTask = this.tasks.find(tasks => tasks.id === id)

    return findTask
  }

  public async findAllTasks(project_id: string): Promise<Task[]> {
    const findByProjectId = this.tasks.filter(
      tasks => tasks.project_id === project_id,
    )

    return findByProjectId
  }

  public async findCompletedTasks(project_id: string): Promise<Task[]> {
    const findByProjectId = this.tasks.filter(
      tasks => tasks.project_id === project_id && tasks.completed === true,
    )

    return findByProjectId
  }

  public async create(taskData: ICreateTasksDTO): Promise<Task> {
    const task = new Task()

    Object.assign(task, { id: uuid(), completed: true }, taskData)

    this.tasks.push(task)

    return task
  }

  public async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task.id)

    this.tasks[findIndex] = task

    return task
  }

  public async delete(task: Task): Promise<Task | {}> {
    const findTask = this.tasks.filter(findTask => findTask.id !== task.id)

    return findTask
  }
}

export default FakeTasksRepository
