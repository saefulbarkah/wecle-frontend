import express from 'express';
import commentController from '../controllers/comments/index.js';

const route = express.Router();

route.post('/', commentController.create);
route.get('/article/:articleId', commentController.find);
route.delete('/delete/:commentId', commentController.delete);
route.patch('/update/:commentId', commentController.update);

export default route;
