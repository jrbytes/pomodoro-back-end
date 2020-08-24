import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository'
import CreateProjectService from './CreateProjectService'

let fakeProjectsRepository: FakeProjectsRepository
let createProject: CreateProjectService

describe('CreateProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository()

    createProject = new CreateProjectService(fakeProjectsRepository)
  })

  it('should be able to create a new project', async () => {
    const project = await createProject.execute({
      name: 'John Doe',
      color: 'black',
      user_id: 'id-identification',
    })

    expect(project).toHaveProperty('id')
  })
})
