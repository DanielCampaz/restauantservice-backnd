import { Document } from 'mongoose'

export interface IIngredient {
  name: string
  description: string
  stock: number
  image?: string
}

export interface IIngredientM extends Omit<IIngredient, 'fn'> {}
export interface IIngredientModel extends Document, IIngredientM {}
