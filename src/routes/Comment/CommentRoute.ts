import { Router } from 'express'
import { comment } from './Comment'

const CommentRouter: Router = Router()

CommentRouter.get(comment.pathGetComments, comment.GetComments)
CommentRouter.get(comment.pathGetComment, comment.GetComment)
CommentRouter.get(comment.pathGetCommentByIdProduct, comment.GetCommentByIdProduct)
CommentRouter.post(comment.pathPostComment, comment.PostComment)
CommentRouter.put(comment.pathPutComment, comment.PostComment)
CommentRouter.delete(comment.pathDeleteComment, comment.DeleteComment)

export default CommentRouter
