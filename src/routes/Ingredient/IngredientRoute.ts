import { Router } from 'express'
import { ingredient } from './Ingredient'
import MulterInject from '../../utils/MulterImplementation'

const IngredientRouter: Router = Router()
const multer: MulterInject = new MulterInject({}, null)

IngredientRouter.get(ingredient.pathGetIngredients, ingredient.GetIngredients)
IngredientRouter.get(ingredient.pathGetIngredient, ingredient.GetIngredient)
IngredientRouter.get(ingredient.pathGetIngredientByName, ingredient.GetIngredientByName)
IngredientRouter.post(ingredient.pathPostIngredient, ingredient.PostIngredient)
IngredientRouter.post(ingredient.pathPostIngredientImage, multer.multer.single('file'), ingredient.PostIngredientImage)
IngredientRouter.put(ingredient.pathPutIngredientStock, ingredient.PutIngredientStock)
IngredientRouter.delete(ingredient.pathDeleteIngredient, ingredient.DeleteIngredient)

export default IngredientRouter
