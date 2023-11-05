import { Request, Response } from 'express';
import comments from '../../models/comments.js';
import errorhandling from '../../lib/error-handling.js';
import { NotFoundError } from '../../errors/index.js';

const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.commentId;
    const result = await comments.deleteOne({ _id: id });

    // check if has deleted
    if (result.deletedCount === 0)
      throw new NotFoundError(
        'The specified comment does not exist for deletion.'
      );

    res.send('Delete comment succesfully');
  } catch (error) {
    errorhandling(error as Error, res);
  }
};

export default deleteComment;
