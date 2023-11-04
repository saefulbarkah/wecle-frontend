import express from 'express';
import articleController from '../controllers/article/index.js';

const router = express.Router();

router.get('/lists', articleController.list);
router.post('/create', articleController.create);
router.delete('/delete', articleController.delete);
router.put('/update/:id', articleController.update);

export default router;
