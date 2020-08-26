import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import IncrementPomoService from './IncrementPomoService'

let fakeCacheProvider: FakeCacheProvider
let fakeTasksRepository: FakeTasksRepository
let createTask: CreateTaskService
let incrementPomo: IncrementPomoService

describe('IncrementPomo', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
    incrementPomo = new IncrementPomoService(
      fakeTasksRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to update a pomo', async () => {
    const task = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const updatePomo = await incrementPomo.execute({
      id: task.id,
      realized_pomos: 1,
    })

    expect(updatePomo).toEqual(expect.objectContaining({ realized_pomos: 1 }))
    expect(task).not.toEqual(expect.objectContaining({ realized_pomos: 0 }))
  })

  it('should be able verify if pomo exists', async () => {
    await expect(
      incrementPomo.execute({
        id: '',
        realized_pomos: 1,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
