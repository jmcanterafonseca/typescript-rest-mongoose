import type { ICarData } from "../models/ICarData";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "../JSON-Schema/car-schema.json";
import type { IValidationResult } from "../models/IValidationResult";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";

export class ValidationHelper {
    public static validate(data: ICarData): IValidationResult {
        const validator = new Ajv();
        addFormats(validator);

        const output: IValidationResult = { result: false };
        output.result = validator.validate(schema, data);

        if (!output.result) {
            output.error = validator.errors as unknown as ISchemaValidationError;
        }

        return output;
    }
}
