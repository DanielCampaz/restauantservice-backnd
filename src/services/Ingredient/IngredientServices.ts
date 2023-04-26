import { IIngredient } from '../../interfaces/IIngredients'
import { IService } from '../../interfaces/IService'
import IngredientSchema from '../../schema/Ingredients'
import { loggerServices } from '../LoggerServices'

export default class IngredientService implements IService<IIngredient> {
  async Create (item: IIngredient): Promise<IIngredient> {
    const newIngredient = new IngredientSchema({
      name: item.name,
      description: item.description,
      stock: item.stock,
      image: item.image
    })

    const ingredientCreate = await newIngredient.save()
    loggerServices.Log('ingredient', 'Ingredient Create Successful')
    return ingredientCreate
  }

  // filter {_id: id} || {comment: comment}
  async Update (filter: object, update: object): Promise<any> {
    return await IngredientSchema.findOneAndUpdate(filter, update, { new: true })
  }

  async Delete (id: string): Promise<any> {
    return await IngredientSchema.deleteOne({ _id: id })
  }

  async Find (id: string): Promise<IIngredient | null> {
    return await IngredientSchema.findById(id)
  }

  async FindByName (name: string): Promise<IIngredient | null> {
    return await IngredientSchema.findOne({ name })
  }

  async FindAll (): Promise<any> {
    return await IngredientSchema.find()
  }
}
