import type { ISchemaValidationError } from "./ISchemaValidationError";
export interface IValidationResult {
    result: boolean;
    error?: ISchemaValidationError;
}
