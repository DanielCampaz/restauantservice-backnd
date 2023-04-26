import { IProduct } from '../../interfaces/IProduct'
import { IService } from '../../interfaces/IService'
import ProductSchema from '../../schema/Product'
import { loggerServices } from '../LoggerServices'

export default class ProductService implements IService<IProduct> {
  async Create (item: IProduct): Promise<IProduct> {
    const newProduct = new ProductSchema(item)

    const productCreate = await newProduct.save()
    loggerServices.Log('product', 'Product Create Successful')
    return productCreate
  }

  // filter {_id: id} || {comment: comment}
  async Update (filter: object, update: object): Promise<any> {
    return await ProductSchema.findOneAndUpdate(filter, update, { new: true })
  }

  async Delete (id: string): Promise<any> {
    return await ProductSchema.deleteOne({ _id: id })
  }

  async Find (id: string): Promise<IProduct | null> {
    return await ProductSchema.findById(id)
  }

  async FindByName (name: string): Promise<IProduct | null> {
    return await ProductSchema.findOne({ name })
  }

  async FindAll (): Promise<any> {
    return await ProductSchema.find()
  }
}
