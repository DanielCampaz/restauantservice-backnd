import { Request, Response } from 'express'
import { InterceptorExtends } from '../interfaces/IInterceptorExtends'
import { EnumColorLogger } from '../types.enum'
import { InterceptorMethod } from '../types'
import { FILTER_URL } from '../utils/const'
import { Logger } from '../utils/Logger'

const Interceptors: InterceptorExtends[] = []
const logger: Logger = new Logger(EnumColorLogger.FgBlue, 'Interceptor')

function pushInterceptor (urlEndpointPrincipal: string, func: InterceptorMethod): void {
  const newInterceptorExtends: InterceptorExtends = {
    interceptor: (req: Request, res: Response, next: Function): void => {
      const path = FILTER_URL(req.path)
      if (path[0] !== urlEndpointPrincipal) {
        next()
      } else {
        logger.Log(`The ${path[0].toUpperCase()} Interceptor has been executed`)
        func(req, res, next, logger)
      }
    },
    name: urlEndpointPrincipal
  }

  const matches = Interceptors.filter((e) => e.name === urlEndpointPrincipal)

  if (matches.length > 0) {
    return
  }

  Interceptors.push(newInterceptorExtends)
  new Logger(EnumColorLogger.BgBlue, 'Interceptor').Log(`Interceptor of ${urlEndpointPrincipal} Import Complete`)
}

export { Interceptors, pushInterceptor }
