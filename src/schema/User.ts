import { model, Schema } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    orders: {
      type: Array<String>,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<IUser>('User', userSchema)
