import type { ICarData } from '../models/ICarData';
import type { ICarService } from './ICarService';
import type { ICarMetadata } from '../models/ICarMetadata';
import type { Model } from 'mongoose';
import type { ICar } from '../models/ICar';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../errors/notFoundError';
import { AlreadyExistsError } from '../errors/alreadyExistsError';

/**
 * Service to manage car information and storing it in a data store
 */
export class CarService implements ICarService {
  private readonly Car: Model<ICar>;

  constructor(carModel: Model<ICar>) {
    this.Car = carModel;
  }

  /**
   * List all cars providing its metadata
   * @returns Car metadata
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
   * @param id The Id of the car
   * 
   */
  public async deleteCar(id: string): Promise<void> {
    const carData = await this.Car.findOne({ id }, "id");
    if (!carData) {
      throw new NotFoundError(`Car ${id} not found`)
    }
    await this.Car.deleteOne({ id });
  }

  /**
   * Adds a car to the system
   * @param carData The car data
   * @returns The Id (URN) of the new car
   */
  public async addCar(carData: ICarData): Promise<string> {
    const vehicleIdentificationNumber = carData.vehicleIdentificationNumber;
    if (!vehicleIdentificationNumber) {
      throw new Error("Vehicle Identification Number not present");
    }

    // There cannot be two cars with the same vehicle identification number
    const existingData = await this.Car.findOne({ vehicleIdentificationNumber }, "id");
    if (existingData) {
      throw new AlreadyExistsError(`Vehicle with identification number ${vehicleIdentificationNumber} already exists`);
    }

    // This is the Id of the Vehicle in our system
    const id = `urn:uuid:${uuidv4()}`;
    const type = "Car";
    const dateCreated = Date.now();
    const dateModified = dateCreated;

    // New car document created
    const car = new this.Car({ ...carData, id, type, dateCreated, dateModified });
    await car.save();

    return id;
  }

  /**
   * Updates a car already existing in the system
   * @param id 
   * @param carData The data of the car
   */
  public async updateCar(id: string, carData: ICarData): Promise<void> {
    const existingCar = await this.Car.findOne({ id }, "id type dateCreated");
    if (!existingCar) {
      throw new NotFoundError(`Car ${id} not found`)
    }

    // Update the document by Id ensuring the immutable fields are not overridden 
    await this.Car.updateOne({ id }, {
      ...carData,
      id: existingCar.id,
      type: existingCar.type,
      dateCreated: existingCar.dateCreated,
      dateModified: Date.now()
    });
  }
}
