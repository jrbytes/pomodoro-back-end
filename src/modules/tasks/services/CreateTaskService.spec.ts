import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'

let fakeCacheProvider: FakeCacheProvider
let fakeTasksRepository: FakeTasksRepository
let createTask: CreateTaskService

describe('CreateTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
  })

  it('should be able to create a new task', async () => {
    const project = await createTask.execute({
      name: 'Criar script',
      project_id: 'id-identification',
    })

    expect(project).toHaveProperty('id')
  })
})
