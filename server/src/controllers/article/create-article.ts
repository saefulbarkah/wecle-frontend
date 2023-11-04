import { Request, Response } from 'express';
import zodErrorHandling from '../../lib/zod-error-handling.js';
import { articleSchema, articleType } from '../../schema/article-schema.js';
import Article from '../../models/article.js';
import { nanoid } from 'nanoid';
import { toCapitalizeString, toSlug } from '../../lib/convert-string.js';

const createArticle = async (req: Request, res: Response) => {
  try {
    const { author, content, title } = req.body as articleType;
    articleSchema.parse({ author, content, title });

    // make slug
    const randomizer = nanoid(10);
    const capTitle = toCapitalizeString(title);
    const slug = `${toSlug(capTitle)}-${randomizer}`;

    await Article.create({ author, content, title, slug });
    res.send('Article success created');
  } catch (error) {
    zodErrorHandling(error, res);
  }
};

export default createArticle;
