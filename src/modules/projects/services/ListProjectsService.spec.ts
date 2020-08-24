// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository'
import CreateProjectService from './CreateProjectService'
import ListProjectsService from './ListProjectsService'

let fakeProjectsRepository: FakeProjectsRepository
// let fakeCacheProvider: FakeCacheProvider
let createProject: CreateProjectService
let listProjectsService: ListProjectsService

describe('ListProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository()
    // fakeCacheProvider = new FakeCacheProvider()

    createProject = new CreateProjectService(fakeProjectsRepository)

    listProjectsService = new ListProjectsService(
      fakeProjectsRepository,
      // fakeCacheProvider,
    )
  })

  it('should be able to list projects of user', async () => {
    await createProject.execute({
      name: 'John Doe',
      color: 'black',
      user_id: 'id-identification',
    })

    await createProject.execute({
      name: 'John Doe',
      color: 'gray',
      user_id: 'id-identification',
    })

    const findAllById = await listProjectsService.execute({
      user_id: 'id-identification',
    })

    expect(findAllById).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: 'id-identification',
        }),
      ]),
    )
  })
})
