import { ErrorResponse } from '../interfaces/IErrorResponse'
import { HTTP_RESPONSE } from '../types.enum'

export default abstract class TypeChecks {
  public readonly TypeChecks: boolean = true
  static sendError (message: string, status: HTTP_RESPONSE): ErrorResponse {
    return {
      error: message,
      status
    }
  }
}
