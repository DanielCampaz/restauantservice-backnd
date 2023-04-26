import { Request, Response } from 'express'
import { pushInterceptor } from '../routes/Interceptors'
import { ILoggerChild } from '../interfaces/ILoggerChild'

export abstract class Controller {
  abstract readonly path: string
  abstract Interceptor (req: Request, _res: Response, next: Function, interceptorLogger: ILoggerChild): void
  addInterceptor (): void {
    const PATH = this.path.split('/')[1]
    pushInterceptor(PATH, this.Interceptor)
  }
}
