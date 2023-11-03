import mongoose, { Schema, InferSchemaType } from 'mongoose';

export const authorSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: Schema.ObjectId,
  },
  name: String,
});

type TAuthor = InferSchemaType<typeof authorSchema>;

const Author = mongoose.model<TAuthor>('Author', authorSchema);

export default Author;
