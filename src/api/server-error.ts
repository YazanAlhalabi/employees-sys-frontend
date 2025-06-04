import { ErrorMessage, ErrorResponse } from "../types"

export class ServerError implements ErrorResponse {
  status = "error" as const
  data = null
  constructor(public errors: ErrorMessage[]) {
    this.errors = errors
  }
}
