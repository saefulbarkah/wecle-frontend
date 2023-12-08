import { NextFunction, Request, Response } from 'express';
import Article from '../../models/article.js';
import { NotFoundError } from '../../errors/index.js';
import { ApiResponse } from '../../types/index.js';
import comments from '../../models/comments.js';

type Treq = {
  articleId: string;
};

export default async function findComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const param = req.params as Treq;
    const { articleId } = param;

    const comment = await comments
      .find({ article: articleId })
      .populate('article');

    const response: ApiResponse = {
      status: 200,
      message: 'Opration success',
      response: 'success',
      data: comment.length !== 0 ? comment : null,
    };

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
}
