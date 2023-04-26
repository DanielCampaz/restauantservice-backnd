import TypeChecks from '../../abstract/TypeChecks'
import { IUser } from '../../interfaces/IUser'
import { HTTP_RESPONSE, ROLES } from '../../types.enum'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { validationString } from './utils.typecheck'
import md5 from 'md5'

export default class UserTypeCheck extends TypeChecks {
  static check (body: any): IUser | ErrorResponse {
    const { name, lastName, email, password, address, orders, type } = body
    if ((name === undefined) || (lastName === undefined) || (email === undefined) || (password === undefined) || (address === undefined) || (type === undefined)) {
      return this.sendError('Missing required property', HTTP_RESPONSE.NO_ACCEPTABLE)
    }

    if (!validationString(name)) {
      return this.sendError('Error in property "Name"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (!validationString(lastName)) {
      return this.sendError('Error in property "LastName"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (!validationString(address)) {
      return this.sendError('Error in property "Address"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (!this.validationEmail(email)) {
      return this.sendError('Error in property "Email"', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (!this.validationPassword(password)) {
      return this.sendError('Error in property "Password" Must be greater than 7 ', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (!this.validationType(type)) {
      return this.sendError('Error in property "Type" It must be admin or user to be admin the creation id must be admin', HTTP_RESPONSE.NO_ACCEPTABLE)
    }
    if (orders !== undefined) {
      if (!this.validationOrders(orders)) {
        return this.sendError('Error in property "Order" It must be an array and all its elements must be string', HTTP_RESPONSE.NO_ACCEPTABLE)
      }
    }

    return {
      name,
      lastName,
      email,
      password: md5(password),
      address,
      type,
      orders: orders !== undefined ? orders : []
    }
  }

  static validationEmail (item: any): boolean {
    if (typeof item !== 'string') {
      return false
    } else {
      if (item.includes('@') && item.includes('.')) return true
      else {
        return false
      }
    }
  }

  static validationPassword (item: any): boolean {
    if (typeof item !== 'string') {
      return false
    } else {
      if (item.length < 7) {
        return false
      } else return true
    }
  }

  static validationType (item: any): boolean {
    if (typeof item !== 'string') {
      return false
    } else {
      if (Object.values(ROLES).includes(item as ROLES)) return true
      else {
        return false
      }
    }
  }

  static validationOrders (item: any): boolean {
    if (!Array.isArray(item)) {
      return false
    } else {
      const noString = item.filter((e) => typeof e !== 'string')
      if (noString.length > 0) {
        return false
      } else {
        return true
      }
    }
  }
}
