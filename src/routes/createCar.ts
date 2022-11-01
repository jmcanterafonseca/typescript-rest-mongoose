import type { ICarService } from "../services/ICarService";
import type { Request, Response } from "express";
import type { ICarData } from "../models/ICarData";
import { AlreadyExistsError } from "../errors/alreadyExistsError";
import { ValidationError } from "../errors/validationError";

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

        if (error instanceof ValidationError) {
            res.status(400).json({
                type: "ValidationError",
                details: error.message
            });
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
