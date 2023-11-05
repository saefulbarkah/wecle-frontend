import { Request, Response } from 'express';
import Article from '../../models/article.js';
import errorHandling from '../../lib/error-handling.js';
import { NotFoundError } from '../../errors/index.js';

export default async function deleteArticle(req: Request, res: Response) {
  try {
    const { id } = req.body as { id: string };
    const deleteResult = await Article.deleteOne({ _id: id });

    // check if not deleted
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundError(
        'The specified article does not exist for deletion'
      );
    }

    res.send('Article deleted successfully');
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
