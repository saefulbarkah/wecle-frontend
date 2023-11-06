import { Response } from 'express';
import { z } from 'zod';
import { NotFoundError, ValidationError } from '../errors/index.js';

const errorHandling = (error: Error, res: Response) => {
  if (error instanceof z.ZodError) {
    const errorMsg = error.issues.map((item) => {
      return {
        message: item.message,
        field: item.path[0],
      };
    });
    res.status(400).json(errorMsg);
  } else if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message });
  } else if (error instanceof ValidationError) {
    res.status(400).json({ error: error.message });
  } else {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorHandling;
