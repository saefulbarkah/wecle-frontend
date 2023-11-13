import { Request, Response } from 'express';
import Article from '../../models/article.js';
import errorHandling from '../../lib/error-handling.js';
import { ApiResponse } from '../../types/index.js';

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
    const response: ApiResponse = {
      status: 200,
      message: 'Opration success',
      response: 'success',
    };
    res.status(response.status).json(response);
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
