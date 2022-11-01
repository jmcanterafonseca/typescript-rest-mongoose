import type { Request, Response } from "express";
import type { ICarService } from "../services/ICarService";
import type { ICarMetadata } from "../models/ICarMetadata";

/**
 * Car listing REST operation handler
 * @param req 
 * @param res 
 * @param carService 
 * @returns 
 */
async function listCars(req: Request, res: Response, carService: ICarService) {
  let cars: ICarMetadata[] = [];

  try {
    cars = await carService.listCars();
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
    
    return;
  }

  res.json(cars);
}

export default listCars;
