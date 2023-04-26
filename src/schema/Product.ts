import { model, Schema } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    idIngredients: {
      type: Array<String>,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    idComments: {
      type: Array<String>,
      required: false
    },
    images: {
      type: Array<String>,
      required: false
    }
  },
  { timestamps: true }
)

export default model<IProduct>('Product', productSchema)
