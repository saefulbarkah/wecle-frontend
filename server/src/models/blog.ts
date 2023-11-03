import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { authorSchema } from './author.js';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: authorSchema,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
type Blog = InferSchemaType<typeof blogSchema>;

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
