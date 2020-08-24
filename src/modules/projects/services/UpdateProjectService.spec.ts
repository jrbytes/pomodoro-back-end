import AppError from '@shared/errors/AppError'

import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository'
import CreateProjectService from './CreateProjectService'
import UpdateProjectService from './UpdateProjectService'

let fakeProjectsRepository: FakeProjectsRepository
let createProject: CreateProjectService
let updateProject: UpdateProjectService

describe('CreateProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository()

    createProject = new CreateProjectService(fakeProjectsRepository)
    updateProject = new UpdateProjectService(fakeProjectsRepository)
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
