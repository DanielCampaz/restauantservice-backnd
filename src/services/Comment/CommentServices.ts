import { IComment } from '../../interfaces/IComment'
import { IService } from '../../interfaces/IService'
import CommentSchema from '../../schema/Comment'
import { loggerServices } from '../LoggerServices'

export default class CommentService implements IService<IComment> {
  async Create (item: IComment): Promise<IComment> {
    const newComment = new CommentSchema({
      idProduct: item.idProduct,
      comment: item.comment
    })

    const commentCreate = await newComment.save()
    loggerServices.Log('comment', 'Comment Create Successful')
    return commentCreate
  }

  // filter {_id: id} || {comment: comment}
  async Update (filter: object, update: object): Promise<any> {
    const commentUpdate = await CommentSchema.findOneAndUpdate(filter, update, { new: true })
    return commentUpdate
  }

  async Delete (id: string): Promise<any> {
    return await CommentSchema.deleteOne({ _id: id })
  }

  async Find (id: string): Promise<IComment | null> {
    return await CommentSchema.findById(id)
  }

  async FindByIdProduct (idProduct: string): Promise<IComment | null> {
    return await CommentSchema.findOne({ idProduct })
  }

  async FindAll (): Promise<any> {
    return await CommentSchema.find()
  }
}
