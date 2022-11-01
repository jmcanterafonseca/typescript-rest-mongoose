import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose, { Schema, model, connect } from "mongoose";
import listCars from "./routes/listCars";
import { CarService } from "./services/carService";
import type { ICarService } from "./services/ICarService";
import getCar from "./routes/getCar";
import deleteCar from "./routes/deleteCar";
import updateCar from "./routes/updateCar";
import createCar from "./routes/createCar";
import type { ICar } from "./models/ICar";


async function run() {
  dotenv.config();
  const port = process.env.PORT ?? 5000;
  const mongoDBConnectionString = process.env.MONGO_DB_CONN_STR ?? "mongodb://localhost:27017/test";

  const service = setupService();

  const app: Express = express();
  app.use(express.json());

  app.get("/cars", async (req: Request, res: Response) => {
    await listCars(req, res, service);
  });

  app.get("/cars/:carId", async (req: Request, res: Response) => {
    await getCar(req, res, service);
  });

  app.post("/cars", async (req: Request, res: Response) => {
    await createCar(req, res, service);
  });

  app.delete("/cars/:carId", async (req: Request, res: Response) => {
    await deleteCar(req, res, service);
  });

  app.patch("/cars/:carId", async (req: Request, res: Response) => {
    await updateCar(req, res, service);
  });

  await connect(mongoDBConnectionString);
  const db = mongoose.connection;
  db.on("error", (error) => console.error("MongoDB connection error: ", error));

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

function setupService(): ICarService {
  // Create a Schema corresponding to the document interface.
  const carSchema = new Schema<ICar>({
    _id: String,
    id: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    vehicleIdentificationNumber: { type: String, required: true },
    color: String,
    emissionsCO2: Number,
    dateVehicleFirstRegistered: Date,
    dateCreated: { type: Date, required: true },
    dateModified: { type: Date, default: Date.now }
  }, { _id: false });

  // Create a Model.
  const Car = model<ICar>("Car", carSchema);

  const service: ICarService = new CarService(Car);

  return service;
}

run().then(() => console.log("Initialization OK")).catch(err => console.error(err));
