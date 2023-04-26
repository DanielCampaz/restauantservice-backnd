import { Request, Response } from 'express'
import { Controller } from '../../abstract/Controller'
import { ILoggerChild } from '../../interfaces/ILoggerChild'
import { Logger } from '../../utils/Logger'
import { EnumColorLogger, HTTP_RESPONSE } from '../../types.enum'
import { InputHttpMethodsArgument, ReturnMethod } from '../../types'
import HttpMethods from '../../decorators/HttpMethods'
import OrderService from '../../services/Order/OrderServices'
import OrderTypeCheck from '../typecheck/OrderTypeCheck'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IOrder } from '../../interfaces/IOrder'
import { host } from '../../utils/settings'

const loggerOrder: Logger = new Logger(EnumColorLogger.FgCyan, 'Order')

const orderService: OrderService = new OrderService()

export class Order extends Controller {
  public readonly path: string = '/order'

  // Routes
  public readonly pathGetOrders: string = '/'
  public readonly pathGetOrder: string = '/:id'
  public readonly pathGetOrderByIdUser: string = '/userid/:id'
  public readonly pathPostOrder: string = '/'
  public readonly pathPutOrder: string = '/:id'
  public readonly pathPutOrderIdProduct: string = '/idproduct/:id'
  public readonly pathDeleteOrder: string = '/:id'

  constructor () {
    super()

    this.addInterceptor()
    loggerOrder.Log('Orders Routes:')
    loggerOrder.Log(`GET Orders: ${host}${this.path}${this.pathGetOrders}`)
    loggerOrder.Log(`GET Order: ${host}${this.path}${this.pathGetOrder}`)
    loggerOrder.Log(`GET Order By Id User: ${host}${this.path}${this.pathGetOrderByIdUser}`)
    loggerOrder.Log(`POST Order: ${host}${this.path}${this.pathPostOrder}`)
    loggerOrder.Log(`PUT Order: ${host}${this.path}${this.pathPutOrder}`)
    loggerOrder.Log(`PUT Order only update Complete: ${host}${this.path}${this.pathPutOrderIdProduct}`)
    loggerOrder.Log(`DELETE Order: ${host}${this.path}${this.pathDeleteOrder}`)
  }

  @HttpMethods(true)
  async GetOrders (_input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const order = await orderService.FindAll()
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: order
    }
  }

  @HttpMethods(true)
  async GetOrder (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const order = await orderService.Find(id)
    if (order === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Order whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: order
      }
    }
  }

  @HttpMethods(true)
  async GetOrderByIdUser (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const order = await orderService.FindByIdUser(id)
    if (order === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Order whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: order
      }
    }
  }

  @HttpMethods(true)
  async PostOrder (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const orderVericate = OrderTypeCheck.check(input.body)
    if (Object.hasOwn(orderVericate, 'error')) {
      const errorFin = orderVericate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    } else {
      const newOrder = await orderService.Create(orderVericate as IOrder)
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: newOrder
      }
    }
  }

  @HttpMethods(true)
  async PutOrder (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { complete } = input.body
    const id = input.params.id
    if (complete === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Complete Required'
      }
    }
    const orderUpdate = await orderService.Update({ _id: id }, { complete })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: orderUpdate
    }
  }

  @HttpMethods(true)
  async PutOrderIdProduct (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idProduct, action } = input.body
    const id = input.params.id
    if (idProduct === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'ID Product Required'
      }
    }
    if (action === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Action Required'
      }
    }

    if (action !== 'push') {
      if (action !== 'remove') {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: 'Only in Action Push, Remove'
        }
      }
    }

    const order = await orderService.Find(id)
    let antIdProducts: string[] = []

    if (order !== null) {
      if (action === 'remove') {
        antIdProducts = order.idProducts.filter((e: string) => e !== idProduct)
      } else {
        antIdProducts = order.idProducts
      }
    }

    if (action === 'push') {
      antIdProducts.push(idProduct)
    }
    const orderUpdate = await orderService.Update({ _id: id }, { idProducts: antIdProducts })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: orderUpdate
    }
  }

  @HttpMethods(true)
  async DeleteOrder (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const orderDelete = await orderService.Delete(id)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: orderDelete
    }
  }

  Interceptor (_req: Request, _res: Response, next: Function, interceptorLogger: ILoggerChild): void {
    interceptorLogger.LogChild('Order', 'Order is Execute')
    next()
  }
}

export const order: Order = new Order()
