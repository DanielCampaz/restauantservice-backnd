import TypeChecks from '../../abstract/TypeChecks'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IIngredient } from '../../interfaces/IIngredients'
import { HTTP_RESPONSE } from '../../types.enum'
import { validationNumber, validationString } from './utils.typecheck'

export default class IngredientTypeCheck extends TypeChecks {
  static check (body: any): IIngredient | ErrorResponse {
    const { name, description, stock, image } = body
    let imageV = ''
    if ((name === undefined) || (description === undefined) || stock === undefined) {
      return this.sendError('Missing required property', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(name)) {
      return this.sendError('Error in property "Name"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(description)) {
      return this.sendError('Error in property "Description"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationNumber(stock)) {
      return this.sendError('Error in property "Stock"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (image !== undefined) {
      if (!validationString(image)) {
        return this.sendError('Error in property "Stock"', HTTP_RESPONSE.NO_ACCEPTABLE)
      } else {
        imageV = image
      }
    }

    return {
      name,
      description,
      stock,
      image: imageV
    }
  }
}
