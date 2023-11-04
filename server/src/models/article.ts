import mongoose, { InferSchemaType, Schema } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    requird: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
type ArticleType = InferSchemaType<typeof articleSchema>;

const Article = mongoose.model<ArticleType>('Article', articleSchema);

export default Article;
