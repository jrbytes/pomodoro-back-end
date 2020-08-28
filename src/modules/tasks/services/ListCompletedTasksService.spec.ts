import { classToClass } from 'class-transformer'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository'
import CreateTaskService from './CreateTaskService'
import UpdateCompletedTaskService from './UpdateCompletedTaskService'
import ListCompletedTasksService from './ListCompletedTasksService'

let fakeTasksRepository: FakeTasksRepository
let fakeCacheProvider: FakeCacheProvider
let createTask: CreateTaskService
let updateCompletedTask: UpdateCompletedTaskService
let listCompletedTasks: ListCompletedTasksService

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createTask = new CreateTaskService(fakeTasksRepository, fakeCacheProvider)
    updateCompletedTask = new UpdateCompletedTaskService(
      fakeTasksRepository,
      fakeCacheProvider,
    )
    listCompletedTasks = new ListCompletedTasksService(
      fakeTasksRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list completed tasks of one project', async () => {
    const task1 = await createTask.execute({
      name: 'Tarefa 1',
      project_id: 'id-identification',
    })

    const task2 = await createTask.execute({
      name: 'Tarefa 2',
      project_id: 'id-identification',
    })

    await updateCompletedTask.execute({
      id: task1.id,
      completed: true,
      project_id: 'id-identification',
    })

    await updateCompletedTask.execute({
      id: task2.id,
      completed: true,
      project_id: 'id-identification',
    })

    const findCompletedTasks = await listCompletedTasks.execute({
      project_id: 'id-identification',
    })

    expect(findCompletedTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          completed: true,
          project_id: 'id-identification',
        }),
      ]),
    )
  })

  it('should be able verify if completed tasks exists in cache', async () => {
    const project1 = await createTask.execute({
      name: 'Desenvolvimento',
      project_id: 'id-identification',
    })

    const project2 = await createTask.execute({
      name: 'Estudo',
      project_id: 'id-identification',
    })

    const projects = [project1, project2]

    await fakeCacheProvider.save(
      `tasks-completed-list:id-identification`,
      classToClass(projects),
    )

    const listProjects = await listCompletedTasks.execute({
      project_id: 'id-identification',
    })

    expect(listProjects).toEqual([project1, project2])
  })
})
