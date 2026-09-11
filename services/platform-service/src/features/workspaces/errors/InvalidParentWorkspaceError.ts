import { ApplicationError } from "@pine/errors";

export class InvalidParentWorkspaceError extends ApplicationError {
  constructor(message = "Parent workspace is invalid for this tenant") {
    super("INVALID_PARENT_WORKSPACE", message, true);
  }
}
