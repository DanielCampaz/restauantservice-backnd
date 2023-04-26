import TypeChecks from '../../abstract/TypeChecks'
import { IComment } from '../../interfaces/IComment'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { HTTP_RESPONSE } from '../../types.enum'
import { validationString } from './utils.typecheck'

export default class CommentTypeCheck extends TypeChecks {
  static check (body: any): IComment | ErrorResponse {
    const { idProduct, comment } = body
    if ((idProduct === undefined) || (comment === undefined)) {
      return this.sendError('Missing required property', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(idProduct)) {
      return this.sendError('Error in property "IdProduct"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(comment)) {
      return this.sendError('Error in property "Comment"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    return {
      idProduct,
      comment
    }
  }
}
