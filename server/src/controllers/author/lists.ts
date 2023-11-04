import { Request, Response } from 'express';
import Author from '../../models/author.js';

const lists = async (req: Request, res: Response) => {
  try {
    const data = await Author.find({}).populate('user', 'name avatar email');
    res.send(data);
  } catch (error) {
    throw Error(error as any);
  }
};

export default lists;
