import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import ListTasksService from './ListTasksService'

let fakeTasksRepository: FakeTasksRepository
let fakeCacheProvider: FakeCacheProvider
let createTask: CreateTaskService
let listTasksService: ListTasksService

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)

    listTasksService = new ListTasksService(
      fakeTasksRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list tasks of project', async () => {
    await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    await createTask.execute({
      name: 'Tarefa 2',
      project_id: 'id-identification',
    })

    const findAllTasks = await listTasksService.execute({
      project_id: 'id-identification',
    })

    expect(findAllTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          project_id: 'id-identification',
        }),
      ]),
    )
  })

  it('should be able verify if tasks exists in cache', async () => {
    const task1 = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const task2 = await createTask.execute({
      name: 'Tarefa 2',
      project_id: 'id-identification',
    })

    const tasks = await listTasksService.execute({
      project_id: 'id-identification',
    })

    expect(tasks).toEqual([task1, task2])
  })
})
