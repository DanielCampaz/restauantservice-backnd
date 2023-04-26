import { Document } from 'mongoose'

export interface IOrder {
  idUser: string
  idProducts: string[]
  deliveryAddress: string
  dispatchTime: string
  totalOrder: number
  complete: boolean
}

export interface IOrderM extends Omit<IOrder, 'func'> {}
export interface IOrderModel extends Document, IOrderM {}
