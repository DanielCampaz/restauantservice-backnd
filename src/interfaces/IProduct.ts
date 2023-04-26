import { Document } from 'mongoose'

export interface IProduct {
  name: string
  idIngredients: string[]
  price: number
  idComments?: string[]
  images?: string[]
}

export interface IProductM extends Omit<IProduct, 'func'> {}
export interface IProductModel extends Document, IProductM {}
