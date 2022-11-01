/** Information about a Car. More info at https://schema.org/Car */
export interface ICarData {
    /** Brand */
    brand: string;
    /** Model */
    model: string;
    /** Vehicle identification number, VIN (is the Mongo document Id) */
    vehicleIdentificationNumber: string;
    /** Registration date */
    dateVehicleFirstRegistered?: string;
    /** Color */
    color?: string;
    /** CO2 emissions */
    emissionsCO2?: number;
}
