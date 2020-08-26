import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import DeleteTaskService from './DeleteTaskService'

let fakeCacheProvider: FakeCacheProvider
let fakeTasksRepository: FakeTasksRepository
let createTask: CreateTaskService
let deleteTask: DeleteTaskService

describe('UpdateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
    deleteTask = new DeleteTaskService(fakeTasksRepository, fakeCacheProvider)
  })

  it('should be able to delete a task', async () => {
    const task = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const deletedTask = await deleteTask.execute({
      id: task.id,
    })

    expect(deletedTask).toEqual([])
  })

  it('should be able verify if task exists', async () => {
    await expect(
      deleteTask.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
