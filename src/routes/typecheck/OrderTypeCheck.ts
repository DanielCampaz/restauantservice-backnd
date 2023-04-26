import TypeChecks from '../../abstract/TypeChecks'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IOrder } from '../../interfaces/IOrder'
import { HTTP_RESPONSE } from '../../types.enum'
import { validationArray, validationNumber, validationString } from './utils.typecheck'

export default class OrderTypeCheck extends TypeChecks {
  static check (body: any): IOrder | ErrorResponse {
    const { idProducts, deliveryAddress, dispatchTime, totalOrder, complete, idUser } = body

    if ((idUser === undefined) || (idProducts === undefined) || (deliveryAddress === undefined) || (dispatchTime === undefined) || (totalOrder === undefined) || (complete === undefined)) {
      return this.sendError('Missing required property', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!this.validationIdProducts(idProducts)) {
      return this.sendError('Error in property "IdProducts"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(deliveryAddress)) {
      return this.sendError('Error in property "DeliveryAddress"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(dispatchTime)) {
      return this.sendError('Error in property "DispatchTime"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationNumber(totalOrder)) {
      return this.sendError('Error in property "TotalOrder"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(idUser)) {
      return this.sendError('Error in property "TotalOrder"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    return {
      idProducts,
      deliveryAddress,
      dispatchTime,
      totalOrder,
      complete,
      idUser
    }
  }

  static validationIdProducts (item: any): boolean {
    if (validationArray(item)) {
      const noString = item.filter((e: any) => typeof e !== 'string')
      if (noString.length > 0) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
}
