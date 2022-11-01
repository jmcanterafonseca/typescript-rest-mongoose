export interface ICarData {
  brand: string,
  model: string,
  vehicleIdentificationNumber: string,
  dateVehicleFirstRegistered?:  string,
  color?: string;
  emissionsCO2?: number;
};
