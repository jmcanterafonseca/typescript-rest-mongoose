import type { ICarData } from "../models/ICarData";
import type { ICarService } from "./ICarService";
import type { ICarMetadata } from "../models/ICarMetadata";
import type { Model } from "mongoose";
import type { ICar } from "../models/ICar";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "../errors/notFoundError";
import { AlreadyExistsError } from "../errors/alreadyExistsError";
import { ValidationError } from "../errors/validationError";
import { ValidationHelper } from "../utils/validationHelper";

/**
 * Service to manage car information, storing it in a data store
 */
export class CarService implements ICarService {
    private readonly Car: Model<ICar>;

    /**
     * Constructor
     * @param carModel The mongoose car model used to store data
     */
    constructor(carModel: Model<ICar>) {
        this.Car = carModel;
    }

    /**
     * List all cars providing its metadata
     * @returns Car metadata (id, type, dateCreated, dateModified). Aligned with schema.org
     */
    public async listCars(): Promise<ICarMetadata[]> {
        const records = await this.Car.find({}, "-_id id type dateCreated dateModified");

        return records;
    }

    /**
     * Retrieves all car data by id
     * @param id Car Id
     * @returns Car data
     */
    public async getCar(id: string): Promise<ICar | undefined> {
        const data: ICar = await this.Car.findOne({ id }, "-_id -__v");

        return data;
    }

    /**
     * Deletes a card by Id
     * @param id The Id of the car resource (URN)
     *
     */
    public async deleteCar(id: string): Promise<void> {
        const result = await this.Car.deleteOne({ id });

        if (result.deletedCount === 0) {
            throw new NotFoundError(`Car ${id} not found`);
        }
    }

    /**
     * Adds a car to the system
     * @param carData The car data
     * @returns The Id (URN) of the new car
     */
    public async addCar(carData: ICarData): Promise<string> {
        if (!carData.vehicleIdentificationNumber) {
            throw new ValidationError("Vehicle Identification Number must be provided");
        }
        const validation = ValidationHelper.validate(carData);

        if (!validation.result) {
            throw new ValidationError(JSON.stringify(validation.error));
        }

        // This is the Id of the informational resource of a Car in our system
        const id = `urn:uuid:${uuidv4()}`;
        const type = "Car";
        const dateCreated = Date.now();
        const dateModified = dateCreated;

        // New car document created
        const car = new this.Car({
            ...carData,
            id,
            type,
            dateCreated,
            dateModified,
            "@context": "https://schema.org",
            _id: carData.vehicleIdentificationNumber
        });
        try {
            await car.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new AlreadyExistsError(
                    `Vehicle identification number ${carData.vehicleIdentificationNumber} already exists`
                );
            }

            throw error;
        }

        return id;
    }

    /**
     * Updates a car already existing in the system
     * @param id Car resource id (URN)
     * @param carData The data of the car
     */
    public async updateCar(id: string, carData: ICarData): Promise<void> {
        if (carData.vehicleIdentificationNumber) {
            throw new ValidationError("Vehicle Identification Number cannot be modified");
        }

        const validation = ValidationHelper.validate(carData);
        if (!validation.result) {
            throw new ValidationError(JSON.stringify(validation.error));
        }

        const existingCar = await this.Car.findOne({ id }, "id type dateCreated");
        if (!existingCar) {
            throw new NotFoundError(`Car ${id} not found`);
        }

        // Update the document by Id ensuring the immutable fields are not overridden
        await this.Car.updateOne(
            { id },
            {
                ...carData,
                id: existingCar.id,
                type: existingCar.type,
                dateCreated: existingCar.dateCreated,
                dateModified: Date.now()
            }
        );
    }
}
