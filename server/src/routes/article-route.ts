import express from 'express';
import articleController from '../controllers/article/index.js';
import protectedRequest from '../middleware/protect-api.js';

const router = express.Router();

router.get('/lists', articleController.list);
router.post('/create', protectedRequest, articleController.create);
router.delete('/delete', protectedRequest, articleController.delete);
router.put('/update/:id', protectedRequest, articleController.update);

export default router;
