import { Document } from 'mongoose'
import { ROLES } from '../types.enum'

export interface IUser {
  name: string
  lastName: string
  email: string
  password: string
  address: string
  orders?: string[]
  type: ROLES
}

export interface IUserM extends Omit<IUser, 'fn'> {}
export interface IUserModel extends Document, IUserM {}
