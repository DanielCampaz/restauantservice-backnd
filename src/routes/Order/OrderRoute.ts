import { Router } from 'express'
import { order } from './Order'

const OrderRouter: Router = Router()

OrderRouter.get(order.pathGetOrders, order.GetOrders)
OrderRouter.get(order.pathGetOrder, order.GetOrder)
OrderRouter.get(order.pathGetOrderByIdUser, order.GetOrderByIdUser)
OrderRouter.post(order.pathPostOrder, order.PostOrder)
OrderRouter.put(order.pathPutOrder, order.PostOrder)
OrderRouter.put(order.pathPutOrderIdProduct, order.PutOrderIdProduct)
OrderRouter.delete(order.pathDeleteOrder, order.DeleteOrder)

export default OrderRouter
