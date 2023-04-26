import { Request, Response } from 'express'
import { InputHttpMethodsArgument, ReturnMethod } from '../../types'
import HttpMethods from '../../decorators/HttpMethods'
import { Controller } from '../../abstract/Controller'
import { EnumColorLogger, HTTP_RESPONSE, ROLES } from '../../types.enum'
import { Logger } from '../../utils/Logger'
import { ILoggerChild } from '../../interfaces/ILoggerChild'
import UserService from '../../services/User/UserService'
import UserTypeCheck from '../typecheck/UserTypeCheck'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IUser } from '../../interfaces/IUser'
import md5 from 'md5'
import { host } from '../../utils/settings'

const loggerUser: Logger = new Logger(EnumColorLogger.FgCyan, 'User')
const userService: UserService = new UserService()

export class User extends Controller {
  // Paths Url Match
  public readonly path: string = '/user'

  // Routes
  public readonly pathGetUsers: string = '/'
  public readonly pathGetUser: string = '/:id'
  public readonly pathGetUserByEmail: string = '/email/:id'
  public readonly pathGetUserByName: string = '/name/:id'
  public readonly pathGetUserByType: string = '/type/:id'
  public readonly pathPostUser: string = '/'
  public readonly pathPostLogin: string = '/login'
  public readonly pathPostRegister: string = '/register'
  public readonly pathPutUser: string = '/:id'
  public readonly pathPutUserAddress: string = '/address/:id'
  public readonly pathPutUserOrders: string = '/orders/:id'
  public readonly pathPutUserType: string = '/type/:id'
  public readonly pathDeleteUser: string = '/:id'

  constructor () {
    super()
    // Add Interceptor to App
    this.addInterceptor()
    loggerUser.Log('Users Routes:')
    loggerUser.Log(`GET Users: ${host}${this.path}${this.pathGetUsers}`)
    loggerUser.Log(`GET User: ${host}${this.path}${this.pathGetUser}`)
    loggerUser.Log(`GET User By Email: ${host}${this.path}${this.pathGetUserByEmail}`)
    loggerUser.Log(`GET User By Name: ${host}${this.path}${this.pathGetUserByName}`)
    loggerUser.Log(`GET User By Type: ${host}${this.path}${this.pathGetUserByType}`)
    loggerUser.Log(`POST User: ${host}${this.path}${this.pathPostUser}`)
    loggerUser.Log(`POST User Login: ${host}${this.path}${this.pathPostLogin}`)
    loggerUser.Log(`POST User Register: ${host}${this.path}${this.pathPostRegister}`)
    loggerUser.Log(`PUT User: ${host}${this.path}${this.pathPutUser}`)
    loggerUser.Log(`PUT User only update Address: ${host}${this.path}${this.pathPutUserAddress}`)
    loggerUser.Log(`PUT User only update Orders order_id and action: ${host}${this.path}${this.pathPutUserOrders}`)
    loggerUser.Log(`PUT User only update Type: ${host}${this.path}${this.pathPutUserType}`)
    loggerUser.Log(`DELETE User: ${host}${this.path}${this.pathDeleteUser}`)
  }

  @HttpMethods(true)
  async GetUsers (_input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const users = await userService.FindAll()
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: users
    }
  }

  @HttpMethods(true)
  async GetUser (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const user = await userService.Find(id)
    if (user === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Comment whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: user
      }
    }
  }

  @HttpMethods(true)
  async GetUserByEmail (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { email } = input.params
    const user = await userService.FindByEmail(email)
    if (user === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Comment whit this id Product'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: user
      }
    }
  }

  @HttpMethods(true)
  async GetUserByName (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { name } = input.params
    const user = await userService.FindByName(name)
    if (user === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Comment whit this id Product'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: user
      }
    }
  }

  @HttpMethods(true)
  async GetUserByType (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { type } = input.params
    const user = await userService.FindByType(type)
    if (user === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not User whit this Type'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: user
      }
    }
  }

  @HttpMethods(true)
  async PostUser (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const userVericate = UserTypeCheck.check(input.body)
    if (Object.hasOwn(userVericate, 'error')) {
      const errorFin = userVericate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    } else {
      const newUser = await userService.Create(userVericate as IUser)
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: newUser
      }
    }
  }

  @HttpMethods(true)
  async PostLogin (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { email, password } = input.body

    const user = await userService.FindByEmail(email)

    if (user === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: 'Not exist a User whit this email'
      }
    }
    if (user.password === md5(password)) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: user
      }
    } else {
      return {
        status: HTTP_RESPONSE.UNAUTHORIZED,
        response: 'Password Incorrect'
      }
    }
  }

  @HttpMethods(true)
  async PostRegister (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { email, password, address, name } = input.body

    if ((email === undefined) || (password === undefined) || (address === undefined) || (name === undefined)) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: `Name: ${name === undefined ? 'undefined' : name as string}, Email: ${email === undefined ? 'undefined' : email as string}, Password: ${password === undefined ? 'undefined' : md5(password as string)}, Address: ${address === undefined ? 'undefined' : address as string}`
      }
    }

    const newUser = await userService.Create({
      name,
      lastName: '',
      email,
      password: md5(password),
      address,
      type: ROLES.USER,
      orders: []
    })

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: newUser
    }
  }

  @HttpMethods(true)
  async PutUser (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const userVerificate = UserTypeCheck.check(input.body)

    if (Object.hasOwn(userVerificate, 'error')) {
      const errorFin = userVerificate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    }

    const updateUser = await userService.Update({ _id: id }, userService)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: updateUser
    }
  }

  @HttpMethods(true)
  async PutUserType (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const { type } = input.body

    if (type === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Type Required'
      }
    }

    if (type !== 'user') {
      if (type !== 'admin') {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: 'Type only is admin or user'
        }
      }
    }
    const updateUser = await userService.Update({ _id: id }, { type })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: updateUser
    }
  }

  @HttpMethods(true)
  async PutUserAddress (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const { address } = input.body

    if (address === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Address Required'
      }
    }

    const updateUser = await userService.Update({ _id: id }, { address })

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: updateUser
    }
  }

  @HttpMethods(true)
  async PutUserOrders (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const { idOrder, action } = input.body

    if (idOrder === undefined || action === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Id Order and action Required action only push or remove'
      }
    }
    const user = await userService.Find(id)

    if (user === null) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'User not exist'
      }
    }

    let antOrders: string[] = []

    if (user.orders !== undefined) {
      if (action === 'remove') {
        antOrders = user.orders.filter((e: string) => e !== idOrder)
      } else {
        antOrders = user.orders
      }
    }

    if (action === 'push') {
      antOrders.push(idOrder)
    }

    const userUpdate = userService.Update({ _id: id }, { orders: antOrders })

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: userUpdate
    }
  }

  @HttpMethods(true)
  async DeleteUser (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const userDelete = await userService.Delete(id)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: userDelete
    }
  }

  // Interceptor
  Interceptor (_req: Request, _res: Response, next: Function, interceptorLogger: ILoggerChild): void {
    interceptorLogger.LogChild('user', 'User is Execute')
    next()
  }
}

export const user: User = new User()
