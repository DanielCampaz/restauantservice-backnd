import { Router } from 'express'
import { ingredient } from './Ingredient'

const IngredientRouter: Router = Router()

IngredientRouter.get(ingredient.pathGetIngredients, ingredient.GetIngredients)
IngredientRouter.get(ingredient.pathGetIngredient, ingredient.GetIngredient)
IngredientRouter.get(ingredient.pathGetIngredientByName, ingredient.GetIngredientByName)
IngredientRouter.post(ingredient.pathPostIngredient, ingredient.PostIngredient)
IngredientRouter.post(ingredient.pathPostIngredientImage, ingredient.PostIngredientImage)
IngredientRouter.put(ingredient.pathPutIngredientStock, ingredient.PutIngredientStock)
IngredientRouter.delete(ingredient.pathDeleteIngredient, ingredient.DeleteIngredient)

export default IngredientRouter
