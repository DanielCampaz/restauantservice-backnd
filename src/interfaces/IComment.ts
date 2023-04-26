import { Document } from 'mongoose'

export interface IComment {
  idProduct: string
  comment: string
}

export interface ICommentM extends Omit<IComment, 'fn'> {}
export interface ICommentModel extends Document, ICommentM {}
