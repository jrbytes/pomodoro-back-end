import { Request, Response } from 'express'
import { container } from 'tsyringe'

import IncrementPomoService from '@modules/tasks/services/IncrementPomoService'

export default class IncrementPomoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { realized_pomos } = request.body

    const updateTask = container.resolve(IncrementPomoService)

    const task = await updateTask.execute({
      id,
      realized_pomos,
    })

    return response.json(task)
  }
}
