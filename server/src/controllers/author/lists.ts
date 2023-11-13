import { Request, Response } from 'express';
import Author from '../../models/author.js';
import errorHandling from '../../lib/error-handling.js';
import { ApiResponse } from '../../types/index.js';

const lists = async (req: Request, res: Response) => {
  try {
    const data = await Author.find({}).populate('user', 'name avatar email');
    let resources;
    if (data.length === 0) {
      resources = null;
    }
    resources = data;

    const response: ApiResponse = {
      status: 200,
      message: 'Opration success',
      response: 'success',
      data: resources,
    };
    res.status(response.status).json(response);
  } catch (error) {
    errorHandling(error as Error, res);
  }
};

export default lists;
