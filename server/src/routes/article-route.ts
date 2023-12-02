import express from 'express';
import articleController from '../controllers/article/index.js';
import protectedRequest from '../middleware/protect-api.js';

const router = express.Router();

router.get('/lists', articleController.list);
router.post('/create', protectedRequest, articleController.create);
router.delete('/delete', protectedRequest, articleController.delete);
router.put('/update/:id', protectedRequest, articleController.update);
router.post('/save/draft', protectedRequest, articleController.saveDraft);
router.post('/lists/draft', protectedRequest, articleController.draftLists);
router.patch('/find/draft', protectedRequest, articleController.findDraft);

export default router;
