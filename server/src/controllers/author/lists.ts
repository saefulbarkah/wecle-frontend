import { Request, Response } from 'express';
import Author from '../../models/author.js';
import errorHandling from '../../lib/error-handling.js';

const lists = async (req: Request, res: Response) => {
  try {
    const data = await Author.find({}).populate('user', 'name avatar email');
    res.send(data);
  } catch (error) {
    errorHandling(error as Error, res);
  }
};

export default lists;
