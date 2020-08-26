import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowPomoService from '@modules/tasks/services/ShowPomoService'

export default class IncrementPomoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showTask = container.resolve(ShowPomoService)

    const task = await showTask.execute({
      id,
    })

    return response.json(task)
  }
}
