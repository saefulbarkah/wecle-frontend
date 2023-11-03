import express from 'express';
import mongoose from 'mongoose';
import { DB_URL } from './config/db.js';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('express + typescript');
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
