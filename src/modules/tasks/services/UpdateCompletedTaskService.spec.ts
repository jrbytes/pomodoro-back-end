import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import UpdateCompletedTaskService from './UpdateCompletedTaskService'

let fakeCacheProvider: FakeCacheProvider
let fakeTasksRepository: FakeTasksRepository
let createTask: CreateTaskService
let updateCompletedTask: UpdateCompletedTaskService

describe('UpdateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
    updateCompletedTask = new UpdateCompletedTaskService(
      fakeTasksRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to update the field completed of task for true', async () => {
    const task = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const updatedCompletedTask = await updateCompletedTask.execute({
      id: task.id,
      completed: true,
      project_id: 'id-identification',
    })

    expect(updatedCompletedTask).toEqual(
      expect.objectContaining({ completed: true }),
    )
    expect(task).not.toEqual(expect.objectContaining({ completed: false }))
  })

  it('should be able to update the field completed of task for false', async () => {
    const task = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const updatedCompletedTask = await updateCompletedTask.execute({
      id: task.id,
      completed: true,
      project_id: 'id-identification',
    })

    await updateCompletedTask.execute({
      id: task.id,
      completed: false,
      project_id: 'id-identification',
    })

    expect(updatedCompletedTask).toEqual(
      expect.objectContaining({ completed: false }),
    )
    expect(updatedCompletedTask).not.toEqual(
      expect.objectContaining({ completed: true }),
    )
  })

  it('should be able verify if task with completed field exists and if true', async () => {
    await expect(
      updateCompletedTask.execute({
        id: '',
        completed: true,
        project_id: 'id-identification',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
