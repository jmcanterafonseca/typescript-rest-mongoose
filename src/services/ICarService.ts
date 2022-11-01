import type { ICarMetadata } from "../models/ICarMetadata";
import type { ICarData } from "../models/ICarData";
import type { ICar } from "../models/ICar";

/**
 * Interface that allows to manage cars
 *
 */
export interface ICarService {
    addCar(carData: ICarData): Promise<string>;
    listCars(): Promise<ICarMetadata[]>;
    deleteCar(carId: string): void;
    getCar(carId: string): Promise<ICar | undefined>;
    updateCar(carId: string, carData: ICarData): void;
}
