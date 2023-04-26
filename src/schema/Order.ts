import { model, Schema } from 'mongoose'
import { IOrder } from '../interfaces/IOrder'

const orderSchema: Schema = new Schema(
  {
    idProducts: {
      type: Array<String>,
      required: true
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    dispatchTime: {
      type: String,
      required: true
    },
    totalOrder: {
      type: Number,
      required: true
    },
    complete: {
      type: Boolean,
      required: true
    },
    idUser: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<IOrder>('Order', orderSchema)
