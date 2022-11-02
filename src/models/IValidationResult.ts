import type { ISchemaValidationError } from "./ISchemaValidationError";
/**
 * Result of a validation. Used when JSON Schema validations are performed
 */
export interface IValidationResult {
    /** True if the validation was successful. False if there are errors */
    result: boolean;
    /** The errors reported during the validation process */
    error?: ISchemaValidationError;
}
