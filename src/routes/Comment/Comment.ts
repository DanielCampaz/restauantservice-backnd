import { Request, Response } from 'express'
import { Controller } from '../../abstract/Controller'
import { ILoggerChild } from '../../interfaces/ILoggerChild'
import { Logger } from '../../utils/Logger'
import { EnumColorLogger, HTTP_RESPONSE } from '../../types.enum'
import HttpMethods from '../../decorators/HttpMethods'
import { InputHttpMethodsArgument, ReturnMethod } from '../../types'
import CommentService from '../../services/Comment/CommentServices'
import CommentTypeCheck from '../typecheck/CommentTypeCheck'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IComment } from '../../interfaces/IComment'
import { host } from '../../utils/settings'

const loggerComment: Logger = new Logger(EnumColorLogger.FgCyan, 'Comment')
const commentServices: CommentService = new CommentService()
export class Comment extends Controller {
  public readonly path: string = '/comment'

  // Routes
  public readonly pathGetComments: string = '/'
  public readonly pathGetComment: string = '/:id'
  public readonly pathGetCommentByIdProduct: string = '/idproduct/:id'
  public readonly pathPostComment: string = '/'
  public readonly pathPutComment: string = '/:id'
  public readonly pathDeleteComment: string = '/:id'

  constructor () {
    super()
    this.addInterceptor()
    loggerComment.Log('Comment Routes:')
    loggerComment.Log(`GET Comments: ${host}${this.path}${this.pathGetComments}`)
    loggerComment.Log(`GET Comment: ${host}${this.path}${this.pathGetComment}`)
    loggerComment.Log(`GET Comment By Id Product: ${host}${this.path}${this.pathGetCommentByIdProduct}`)
    loggerComment.Log(`POST Comment: ${host}${this.path}${this.pathPostComment}`)
    loggerComment.Log(`PUT Comment only update Comment: ${host}${this.path}${this.pathPutComment}`)
    loggerComment.Log(`DELETE Comment: ${host}${this.path}${this.pathDeleteComment}`)
  }

  @HttpMethods(true)
  async GetComments (_input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const comments = await commentServices.FindAll()
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: comments
    }
  }

  @HttpMethods(true)
  async GetComment (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const comment = await commentServices.Find(id)
    if (comment === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Comment whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: comment
      }
    }
  }

  @HttpMethods(true)
  async GetCommentByIdProduct (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const comment = await commentServices.FindByIdProduct(id)
    if (comment === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Comment whit this id Product'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: comment
      }
    }
  }

  @HttpMethods(true)
  async PostComment (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const commentVericate = CommentTypeCheck.check(input.body)
    if (Object.hasOwn(commentVericate, 'error')) {
      const errorFin = commentVericate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    } else {
      const newComment = await commentServices.Create(commentVericate as IComment)
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: newComment
      }
    }
  }

  @HttpMethods(true)
  async PutComment (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { comment } = input.body
    const id = input.params.id
    if (comment === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Comment Required'
      }
    }
    const commentUpdate = await commentServices.Update({ _id: id }, { comment })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: commentUpdate
    }
  }

  @HttpMethods(true)
  async DeleteComment (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const commentDelete = await commentServices.Delete(id)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: commentDelete
    }
  }

  Interceptor (_req: Request, _res: Response, next: Function, interceptorLogger: ILoggerChild): void {
    interceptorLogger.LogChild('Comment', 'Comment is Execute')
    next()
  }
}

export const comment: Comment = new Comment()
