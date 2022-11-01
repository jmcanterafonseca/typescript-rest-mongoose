import type { ICarService } from '../services/ICarService';
import type { Request, Response } from "express";
import { NotFoundError } from '../errors/notFoundError';

/**
 * Car update REST operation handler
 * @param req 
 * @param res 
 * @param carService 
 * @returns 
 */
async function updateCar(req: Request, res: Response, carService: ICarService) {
  try {
    const id = req.params.carId;

    await carService.updateCar(id, req.body);

  } catch (error) {
    if (error instanceof NotFoundError) {
      res.sendStatus(404);
      return;
    }

    console.error(error);
    res.sendStatus(500);
    return;
  }

  res.sendStatus(204);
}

export default updateCar;
