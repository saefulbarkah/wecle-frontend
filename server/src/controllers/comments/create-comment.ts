import { Request, Response } from 'express';
import { commentType } from '../../schema/comment-schema.js';
import comments from '../../models/comments.js';
import errorhandling from '../../lib/error-handling.js';
import Article from '../../models/article.js';
import User from '../../models/user.js';
import { ValidationError } from '../../errors/index.js';

const createComment = async (req: Request, res: Response) => {
  const { articleId, text, userId } = req.body as commentType;
  try {
    // validation
    const isUser = await User.findOne({ _id: userId });
    const isArticle = await Article.findOne({ _id: articleId });
    if (!isUser)
      throw new ValidationError(
        'The specified user does not exist for comment creation.'
      );
    if (!isArticle)
      throw new ValidationError(
        'The specified article does not exist for comment creation.'
      );

    // process to create comment
    const comment = await comments.create({
      article: articleId,
      text,
      user: userId,
    });

    // update comment id
    await Article.updateOne(
      { _id: articleId },
      { $push: { comments: comment._id } }
    );
    res.send('create comment succesfully');
  } catch (error) {
    errorhandling(error as Error, res);
  }
};

export default createComment;