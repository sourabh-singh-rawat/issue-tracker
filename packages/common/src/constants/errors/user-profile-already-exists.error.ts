import { Errors } from "./errors";
import { ConflictError } from "./http";

export class UserProfileAlreadyExistsError extends ConflictError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "User profile already exists";
    super(message);
    this.errorCode = Errors.ERR_CONFLICT;
    this.errorMessage = message;
  }
}
