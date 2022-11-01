import type { Schema } from "mongoose";

export interface ICarMetadata {
  /** MongoDB document Id (equals to the Vehicle Identification Number) */
  _id: string;
  /** URI that identifies the car's associated informational resource */
  id: string;
  /** Fixed */
  type: "Car";
  /** Created Date */
  dateCreated: Schema.Types.Date;
  /** Modified Date */
  dateModified: Schema.Types.Date;
}
