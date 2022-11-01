import type { ICarMetadata } from "./ICarMetadata";
import type { ICarData } from "./ICarData";
export type ICar = { "@context"?: string } & ICarData & ICarMetadata;
