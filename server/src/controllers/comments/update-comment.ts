import { Request, Response } from 'express';
import errorhandling from '../../lib/error-handling.js';
import { commentSchema, commentType } from '../../schema/comment-schema.js';
import comments from '../../models/comments.js';
import { NotFoundError } from '../../errors/index.js';
import { ApiResponse } from '../../types/index.js';

const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;

    // validation comment
    const isComment = await comments.findOne({ _id: commentId });
    if (!isComment)
      throw new NotFoundError(
        'The specified comment does not exist for update'
      );

    const { text } = req.body as commentType;
    const commentTextSchema = commentSchema.pick({ text: true });
    commentTextSchema.parse({ text });

    await comments.updateOne(
      { _id: commentId },
      {
        $set: {
          text,
          updatedAt: Date.now(),
        },
      }
    );

    const response: ApiResponse = {
      status: 200,
      message: 'Comment updated successfully',
      response: 'success',
    };
    res.status(response.status).json(response);
  } catch (error) {
    errorhandling(error as Error, res);
  }
};

export default updateComment;
