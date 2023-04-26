import { Request, Response } from 'express'
import { Logger } from './class/Logger'
import { HTTP_RESPONSE } from './types.enum'
export type Interceptor = (req: Request, res: Response, next: Function) => void
export type InterceptorMethod = (req: Request, res: Response, next: Function, interceptorLogger: Logger) => void
export interface ReturnMethod {
  status: HTTP_RESPONSE
  response: Object | string | number
}

export interface InputHttpMethodsArgument {
  body: any
  params: any
}

export interface InputHttpMethodsArgumentFile {
  body: any
  params: any
  file: any
}

export interface InputHttpMethodsArgumentFiles {
  body: any
  params: any
  files: any
}

export type InputHttpMethodsFile = Express.Multer.File
