import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository'
import CreateProjectService from './CreateProjectService'
import UpdateProjectService from './UpdateProjectService'

let fakeCacheProvider: FakeCacheProvider
let fakeProjectsRepository: FakeProjectsRepository
let createProject: CreateProjectService
let updateProject: UpdateProjectService

describe('CreateProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeCacheProvider,
    )
    updateProject = new UpdateProjectService(
      fakeProjectsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to update a project', async () => {
    const project = await createProject.execute({
      name: 'Desenvolvimento',
      color: 'black',
      user_id: 'id-identification',
    })

    const updatedProject = await updateProject.execute({
      id: project.id,
      name: 'Estudo',
      color: 'green',
      user_id: 'id-identification',
    })

    expect(updatedProject).toEqual(
      expect.objectContaining({ name: 'Estudo', color: 'green' }),
    )
    expect(project).not.toEqual(
      expect.objectContaining({ name: 'Desenvolvimento', color: 'black' }),
    )
  })

  it('should be able verify if project exists', async () => {
    await expect(
      updateProject.execute({
        id: '',
        name: 'Estudo',
        color: 'green',
        user_id: 'id-identification',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
