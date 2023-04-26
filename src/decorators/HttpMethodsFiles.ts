import { Request, Response } from 'express'

export function HttpMethodsFile (sendPromise: boolean): Function {
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
          params: req.params,
          file: req.file
        }).then((value: any) => {
          if (typeof value === 'object') {
            if (Object.hasOwn(value, 'status')) {
              if (Object.hasOwn(value, 'response')) {
                if (typeof value.response === 'string' || typeof value.response === 'number') {
                  res.status(value.status).send(value.response)
                } else {
                  res.status(value.status).json(value.response)
                }
              }
            }
          }
        })
      } else {
        const value = original({
          body: req.body,
          params: req.params,
          file: req.file
        })
        if (typeof value === 'object') {
          if (Object.hasOwn(value, 'status')) {
            if (Object.hasOwn(value, 'response')) {
              if (typeof value.response === 'string' || typeof value.response === 'number') {
                res.status(value.status).send(value.response)
              } else {
                res.status(value.status).json(value.response)
              }
            }
          }
        }
      }
    }
  }
}

export function HttpMethodsFiles (sendPromise: boolean): Function {
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
          params: req.params,
          files: req.files
        }).then((value: any) => {
          if (typeof value === 'object') {
            if (Object.hasOwn(value, 'status')) {
              if (Object.hasOwn(value, 'response')) {
                if (typeof value.response === 'string' || typeof value.response === 'number') {
                  res.status(value.status).send(value.response)
                } else {
                  res.status(value.status).json(value.response)
                }
              }
            }
          }
        })
      } else {
        const value = original({
          body: req.body,
          params: req.params,
          files: req.files
        })
        if (typeof value === 'object') {
          if (Object.hasOwn(value, 'status')) {
            if (Object.hasOwn(value, 'response')) {
              if (typeof value.response === 'string' || typeof value.response === 'number') {
                res.status(value.status).send(value.response)
              } else {
                res.status(value.status).json(value.response)
              }
            }
          }
        }
      }
    }
  }
}
