import { IOrder } from '../../interfaces/IOrder'
import { IService } from '../../interfaces/IService'
import { loggerServices } from '../LoggerServices'
import OrderSchema from '../../schema/Order'

export default class OrderService implements IService<IOrder> {
  async Create (item: IOrder): Promise<IOrder> {
    const newOrder = new OrderSchema(item)

    const orderCreate = await newOrder.save()
    loggerServices.Log('Order', 'Order Create Successful')
    return orderCreate
  }

  // filter {_id: id} || {comment: comment}
  async Update (filter: object, update: object): Promise<any> {
    return await OrderSchema.findOneAndUpdate(filter, update, { new: true })
  }

  async Delete (id: string): Promise<any> {
    return await OrderSchema.deleteOne({ _id: id })
  }

  async Find (id: string): Promise<IOrder | null> {
    return await OrderSchema.findById(id)
  }

  async FindByIdUser (idUser: string): Promise<IOrder | null> {
    return await OrderSchema.findOne({ idUser })
  }

  async FindAll (): Promise<any> {
    return await OrderSchema.find()
  }
}
