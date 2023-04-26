import { IService } from '../../interfaces/IService'
import { IUser } from '../../interfaces/IUser'
import UserSchema from '../../schema/User'
import { loggerServices } from '../LoggerServices'

export default class UserService implements IService<IUser> {
  async Create (item: IUser): Promise<IUser> {
    const newUser = new UserSchema(item)

    const userCreate = await newUser.save()
    loggerServices.Log('user', 'User Create Successful')
    return userCreate
  }

  // filter {_id: id} || {comment: comment}
  async Update (filter: object, update: object): Promise<any> {
    return await UserSchema.findOneAndUpdate(filter, update, { new: true })
  }

  async Delete (id: string): Promise<any> {
    return await UserSchema.deleteOne({ _id: id })
  }

  async Find (id: string): Promise<IUser | null> {
    return await UserSchema.findById(id)
  }

  async FindByName (name: string): Promise<IUser | null> {
    return await UserSchema.findOne({ name })
  }

  async FindByEmail (email: string): Promise<IUser | null> {
    return await UserSchema.findOne({ email })
  }

  async FindByType (type: string): Promise<any> {
    return await UserSchema.find({ type })
  }

  async FindAll (): Promise<any> {
    return await UserSchema.find()
  }
}
