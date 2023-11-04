import { Request, Response } from 'express';
import zodErrorHandling from '../../lib/zod-error-handling.js';
import { articleSchema } from '../../schema/article-schema.js';
import Article from '../../models/article.js';
import { nanoid } from 'nanoid';
import { toCapitalizeString, toSlug } from '../../lib/convert-string.js';

const updateArticle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body, title, author } = req.body;
    articleSchema.parse({ body, title, author });

    // make slug
    const randomizer = nanoid(10);
    const capTitle = toCapitalizeString(title);
    const slug = `${toSlug(capTitle)}-${randomizer}`;

    await Article.updateOne({ _id: id }, { body, title, slug });
    res.send('Article updated successfully');
  } catch (error) {
    zodErrorHandling(error, res);
  }
};

export default updateArticle;
