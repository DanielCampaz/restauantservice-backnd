import express, { Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Interceptors } from './routes/Interceptors'
import { Logger } from './utils/Logger'
import { EnumColorLogger } from './types.enum'
import { Controller } from './abstract/Controller'
import { InterceptorExtends } from './interfaces/IInterceptorExtends'

const loggerApp: Logger = new Logger(EnumColorLogger.FgMagenta, 'app')

export class App {
  public readonly app = express()
  public readonly db_mongo = mongoose

  interceptors: InterceptorExtends[] = []

  constructor (private readonly URL_MONGO_CONNECTION: string, private readonly PORT: number, private readonly NAME_API: string) {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(`${this.NAME_API}/public`, express.static('src/upload'))
    loggerApp.Log(`Get Files localhost:${this.PORT}${this.NAME_API}/public/**`)
    if (Interceptors.length > 0) {
      Interceptors.forEach((e) => {
        this.addInterceptor(e)
      })
    }

    this.executeInterceptor()
  }

  init (): void {
    // Init Mongo
    this.db_mongo
      .connect(this.URL_MONGO_CONNECTION)
      .then(() => loggerApp.Log('Connection to Mongo DB Successful'))
      .catch((_error) => loggerApp.Error('Connection to Mongo DB Unsuccessful'))

    // Active Server
    this.app.listen(this.PORT, () => {
      loggerApp.Log(`Server in PORT = ${this.PORT}, api = ${this.NAME_API}`)
      loggerApp.Log(`Route = localhost:${this.PORT}${this.NAME_API}`)
    })
  }

  description (description: string): void {
    loggerApp.LogChild('description', description)
  }

  /*
  * Function to Import to Server Routes
  * @param name: String
  * @param route: Route
  * @Return void
  */
  import (controller: Controller, route: Router): void {
    this.app.use(`${this.NAME_API}${controller.path}`, route)
    loggerApp.Log(`${this.NAME_API}${controller.path}`)
    loggerApp.Log(`Route of ${controller.path} Import Complete`)
  }

  addInterceptor (interceptor: InterceptorExtends): void {
    this.interceptors.push(interceptor)
  }

  private executeInterceptor (): void {
    if (this.interceptors.length > 0) {
      this.interceptors.forEach(e => {
        this.app.use(e.interceptor)
        const nameInterceptor = e.name
        loggerApp.Log('Interceptor of ' + nameInterceptor + ' ACTIVE')
      })
    }
  }
}
