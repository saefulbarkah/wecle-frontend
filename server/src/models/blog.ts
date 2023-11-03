import mongoose, { InferSchemaType, Schema } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
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
