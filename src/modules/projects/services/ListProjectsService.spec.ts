import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository'
import CreateProjectService from './CreateProjectService'
import ListProjectsService from './ListProjectsService'

let fakeProjectsRepository: FakeProjectsRepository
let fakeCacheProvider: FakeCacheProvider
let createProject: CreateProjectService
let listProjectsService: ListProjectsService

describe('ListProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeCacheProvider,
    )

    listProjectsService = new ListProjectsService(
      fakeProjectsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list projects of user', async () => {
    await createProject.execute({
      name: 'Desenvolvimento',
      color: 'black',
      user_id: 'id-identification',
    })

    await createProject.execute({
      name: 'Estudo',
      color: 'gray',
      user_id: 'id-identification',
    })

    const findAllProjects = await listProjectsService.execute({
      user_id: 'id-identification',
    })

    expect(findAllProjects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: 'id-identification',
        }),
      ]),
    )
  })

  it('should be able verify if project exists in cache', async () => {
    const projects1 = await createProject.execute({
      name: 'Desenvolvimento',
      color: 'black',
      user_id: 'id-identification',
    })

    const projects2 = await createProject.execute({
      name: 'Desenvolvimento',
      color: 'black',
      user_id: 'id-identification',
    })

    const projects = await listProjectsService.execute({
      user_id: 'id-identification',
    })

    expect(projects).toEqual([projects1, projects2])
  })
})
