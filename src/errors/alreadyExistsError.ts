export class AlreadyExistsError extends Error {
    constructor(message: string) {
        super();
        this.name = "AlreadyExistsError";
        this.message = message;
    }
}
