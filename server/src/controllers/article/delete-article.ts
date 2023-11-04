import { Request, Response } from 'express';
import Article from '../../models/article.js';

export default async function deleteArticle(req: Request, res: Response) {
  try {
    const { id } = req.body as { id: string };
    await Article.deleteOne({ _id: id });
    res.send('Article deleted successfully');
  } catch (error) {
    throw Error(error as any);
  }
}
