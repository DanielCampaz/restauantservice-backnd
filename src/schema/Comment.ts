import { model, Schema } from 'mongoose'
import { ICommentModel } from '../interfaces/IComment'

const commentSchema: Schema = new Schema(
  {
    idProduct: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<ICommentModel>('Comment', commentSchema)
