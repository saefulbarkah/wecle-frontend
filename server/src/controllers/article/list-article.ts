import { Request, Response } from 'express';
import Article from '../../models/article.js';
import errorHandling from '../../lib/error-handling.js';

export default async function listArticle(req: Request, res: Response) {
  try {
    const data = await Article.find({})
      .populate({
        path: 'author',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
        select: 'text user',
      });
    res.send(data);
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
