import { Response } from 'express';
import { z } from 'zod';

const zodErrorHandling = (error: any, res: Response) => {
  if (error instanceof z.ZodError) {
    const errorMsg = error.issues.map((item) => {
      return {
        message: item.message,
        field: item.path[0],
      };
    });
    res.status(400).json(errorMsg);
  } else {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default zodErrorHandling;
