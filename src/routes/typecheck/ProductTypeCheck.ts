import TypeChecks from '../../abstract/TypeChecks'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IProduct } from '../../interfaces/IProduct'
import { HTTP_RESPONSE } from '../../types.enum'
import { validationString, validationArray, validationNumber } from './utils.typecheck'

export default class ProductTypeCheck extends TypeChecks {
  static check (body: any): IProduct | ErrorResponse {
    const { name, idIngredients, price, idComments, images } = body
    let imagesV = []
    let idCommentsV = []

    if ((name === undefined) || (idIngredients === undefined) || (price === undefined)) {
      return this.sendError('Missing required property', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(name)) {
      return this.sendError('Error in property "Name"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationNumber(price)) {
      return this.sendError('Error in property "Price"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!this.validationArrayString(idIngredients)) {
      return this.sendError('Error in property "IdIngredients"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (images !== undefined) {
      if (!this.validationArrayString(images)) {
        return this.sendError('Error in property "Images"', HTTP_RESPONSE.NO_ACCEPTABLE)
      } else {
        imagesV = images
      }
    }

    if (idComments !== undefined) {
      if (!this.validationArrayString(idComments)) {
        return this.sendError('Error in property "IdComments"', HTTP_RESPONSE.NO_ACCEPTABLE)
      } else {
        idCommentsV = idComments
      }
    }

    return {
      name,
      idComments: idCommentsV,
      idIngredients,
      price,
      images: imagesV
    }
  }

  static validationArrayString (item: any): boolean {
    if (validationArray(item)) {
      const notString = item.filter((e: any) => typeof e !== 'string')
      if (notString.length > 0) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
}
