import { Router } from 'express'
import { product } from './Product'
import MulterInject from '../../utils/MulterImplementation'

const ProductRouter: Router = Router()
const multer: MulterInject = new MulterInject({}, null)

ProductRouter.get(product.pathGetProducts, product.GetProducts)
ProductRouter.get(product.pathGetProduct, product.GetProduct)
ProductRouter.get(product.pathGetProductByName, product.GetProductByName)
ProductRouter.post(product.pathPostProduct, product.PostProduct)
ProductRouter.post(product.pathPostProductImage, multer.multer.single('file'), product.PostProductImage)
ProductRouter.put(product.pathPutProductComments, product.PutProductProductComments)
ProductRouter.put(product.pathPutProductImages, product.PutProductImages)
ProductRouter.put(product.pathPutProductIngredients, product.PutProductIngredients)
ProductRouter.delete(product.pathDeleteProduct, product.DeleteProduct)

export default ProductRouter
