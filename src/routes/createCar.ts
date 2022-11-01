import type { ICarService } from "../services/ICarService";
import type { Request, Response } from "express";
import type { ICarData } from "../models/ICarData";
import { AlreadyExistsError } from "../errors/alreadyExistsError";

/**
 * Car creation route REST handler
 * @param req Request
 * @param res  Response
 * @param carService the Car Service
 * @returns
 */
async function createCar(req: Request, res: Response, carService: ICarService) {
    const data = req.body;

    let id = "";
    try {
        id = await carService.addCar(data as ICarData);
    } catch (error) {
        if (error instanceof AlreadyExistsError) {
            res.sendStatus(409);
            return;
        }

        console.error(error);
        res.sendStatus(500);
        return;
    }

    res.setHeader("Location", `/cars/${id}`);
    res.sendStatus(201);
}

export default createCar;
