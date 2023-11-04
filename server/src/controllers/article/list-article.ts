import { Request, Response } from 'express';
import Article from '../../models/article.js';

export default async function listArticle(req: Request, res: Response) {
  try {
    const data = await Article.find({}).populate({
      path: 'author',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    });
    res.send(data);
  } catch (error) {
    throw Error(error as any);
  }
}
