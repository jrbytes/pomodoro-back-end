import { classToClass } from 'class-transformer'

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
      `tasks-list:id-identification`,
      classToClass(projects),
    )

    const listProjects = await listTasksService.execute({
      project_id: 'id-identification',
    })

    expect(listProjects).toEqual([project1, project2])
  })
})
