import { Request, Response } from 'express'

export default function HttpMethods (sendPromise: boolean): Function {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value
    descriptor.value = function (req: Request, res: Response): void {
      if (sendPromise) {
        original({
          body: req.body,
          params: req.params
        }).then((valueWP: any) => {
          if (typeof valueWP === 'object') {
            if (Object.hasOwn(valueWP, 'status')) {
              if (Object.hasOwn(valueWP, 'response')) {
                if (typeof valueWP.response === 'string' || typeof valueWP.response === 'number') {
                  res.status(valueWP.status).send(valueWP.response)
                } else {
                  res.status(valueWP.status).json(valueWP.response)
                }
              }
            }
          }
        })
      } else {
        const valueWOP = original({
          body: req.body,
          params: req.params
        })
        if (typeof valueWOP === 'object') {
          if (Object.hasOwn(valueWOP, 'status')) {
            if (Object.hasOwn(valueWOP, 'response')) {
              if (typeof valueWOP.response === 'string' || typeof valueWOP.response === 'number') {
                res.status(valueWOP.status).send(valueWOP.response)
              } else {
                res.status(valueWOP.status).json(valueWOP.response)
              }
            }
          }
        }
      }
    }
  }
}
