import type { ICarMetadata } from "./ICarMetadata";
import type { ICarData } from "./ICarData";

/** Type alias for Car resource full data */
export type ICar = { "@context"?: string } & ICarData & ICarMetadata;
