import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import UpdateTaskService from './UpdateTaskService'

let fakeCacheProvider: FakeCacheProvider
let fakeTasksRepository: FakeTasksRepository
let createTask: CreateTaskService
let updateTask: UpdateTaskService

describe('CreateProjects', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
    updateTask = new UpdateTaskService(fakeTasksRepository, fakeCacheProvider)
  })

  it('should be able to update a task', async () => {
    const task = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const updatedTask = await updateTask.execute({
      id: task.id,
      name: 'Tarefa One',
      project_id: 'id-identification',
    })

    expect(updatedTask).toEqual(expect.objectContaining({ name: 'Tarefa One' }))
    expect(task).not.toEqual(expect.objectContaining({ name: 'Tarefa 1' }))
  })

  it('should be able verify if project exists', async () => {
    await expect(
      updateTask.execute({
        id: '',
        name: 'Estudo',
        project_id: 'id-identification',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
