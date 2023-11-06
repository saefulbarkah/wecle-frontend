import express from 'express';
import mongoose from 'mongoose';
import { DB_URL } from './config/db.js';
import * as route from './routes/index.js';
import User from './models/user.js';
import Author from './models/author.js';
import protectedRequest from './middleware/protect-api.js';
import Article from './models/article.js';
import comments from './models/comments.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: process.env.ORIGIN_CORS }));
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.cookie('testing', 'edanken');
  res.json('express + typescript');
});

// clear collection
app.get('/clear', async (req, res) => {
  await User.deleteMany();
  await Author.deleteMany();
  await Article.deleteMany();
  await comments.deleteMany();
  res.send('cleared all collection');
});

// route lists
app.use('/auth', route.auth);
app.use('/authors', protectedRequest, route.author);
app.use('/article', protectedRequest, route.article);
app.use('/comments', protectedRequest, route.comment);

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
