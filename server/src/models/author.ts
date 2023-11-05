import mongoose, { Schema, InferSchemaType } from 'mongoose';

const authorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

type TAuthor = InferSchemaType<typeof authorSchema>;

const Author = mongoose.model<TAuthor>('Author', authorSchema);

export default Author;
