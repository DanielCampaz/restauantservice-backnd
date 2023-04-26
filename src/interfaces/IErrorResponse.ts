import { HTTP_RESPONSE } from '../types.enum'

export interface ErrorResponse {
  error: string
  status: HTTP_RESPONSE
}
