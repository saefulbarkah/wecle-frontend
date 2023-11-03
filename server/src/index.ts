import express from 'express';
import dotenv from 'dotenv';

// running env
dotenv.config();

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('express + typescript');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
