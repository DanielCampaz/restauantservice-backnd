import { Router } from 'express'
import { user } from './User'
// import MulterInject from '../../utils/MulterImplementation'

const UserRouter: Router = Router()

// const multerInject: MulterInject = new MulterInject({}, null)

// UserRouter.get(user.pathGetUsers, user.getUsers)
// UserRouter.post(user.pathPostUsers, multerInject.multer.single('file'), user.postUserAvatar)

UserRouter.get(user.pathGetUsers, user.GetUsers)
UserRouter.get(user.pathGetUser, user.GetUser)
UserRouter.get(user.pathGetUserByEmail, user.GetUserByEmail)
UserRouter.get(user.pathGetUserByName, user.GetUserByName)
UserRouter.get(user.pathGetUserByType, user.GetUserByType)
UserRouter.post(user.pathPostUser, user.PostUser)
UserRouter.post(user.pathPostLogin, user.PostLogin)
UserRouter.post(user.pathPostRegister, user.PostRegister)
UserRouter.put(user.pathPutUser, user.PostUser)
UserRouter.put(user.pathPutUserAddress, user.PutUserAddress)
UserRouter.put(user.pathPutUserOrders, user.PutUserOrders)
UserRouter.put(user.pathPutUserType, user.PutUserType)
UserRouter.delete(user.pathDeleteUser, user.DeleteUser)

export default UserRouter
