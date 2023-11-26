import mongoose, { Schema, InferSchemaType } from 'mongoose';

const authorSchema = new Schema({
  name: String,
  about: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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

export { Author, TAuthor };
