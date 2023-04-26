import { model, Schema } from 'mongoose'
import { IIngredientModel } from '../interfaces/IIngredients'

const ingredientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

export default model<IIngredientModel>('Ingredient', ingredientSchema)
