import type { ICarService } from "../services/ICarService";
import type { Request, Response } from "express";
import type { ICar } from "../models/ICar";

/**
 * Get details of a car REST operation handler
 * @param req
 * @param res
 * @param carService
 * @returns
 */
async function getCar(req: Request, res: Response, carService: ICarService) {
    let carData: ICar | undefined = undefined;

    try {
        carData = await carService.getCar(req.params.carId);

        if (!carData) {
            res.sendStatus(404);
            return;
        }

        res.json(carData);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
}

export default getCar;
