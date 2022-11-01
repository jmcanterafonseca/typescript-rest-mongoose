import type { ICarService } from '../services/ICarService';
import type { Request, Response } from "express";
import { NotFoundError } from '../errors/notFoundError';

/**
 * Manages car deletion route
 * @param req Request
 * @param res Response
 * @param carService The car service
 * @returns 
 */
export async function deleteCar(req: Request, res: Response, carService: ICarService) {
  try {
    await carService.deleteCar(req.params.carId);
    res.sendStatus(204);
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      res.sendStatus(404);
      return;
    }

    console.error(error);
    res.sendStatus(500);
    return;
  }
}
