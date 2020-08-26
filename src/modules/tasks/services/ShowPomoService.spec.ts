import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import ShowPomoService from './ShowPomoService'
import CreateTaskServiceFake from '../repositories/fakes/services/CreateTaskServiceFake'

import AppError from '@shared/errors/AppError'

let fakeTasksRepository: FakeTasksRepository
let showPomoService: ShowPomoService

let createTaskService: CreateTaskServiceFake

describe('ShowPomo', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()

    showPomoService = new ShowPomoService(fakeTasksRepository)
    createTaskService = new CreateTaskServiceFake(fakeTasksRepository)
  })

  it('should be able to show pomo', async () => {
    const task1 = await createTaskService.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const show = await showPomoService.execute({ id: task1.id })

    expect(show).toHaveProperty('id')
  })

  it('not should be able to show pomo', async () => {
    await expect(
      showPomoService.execute({ id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
