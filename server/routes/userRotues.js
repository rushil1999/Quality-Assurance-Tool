import express from  'express'
import { getDeveloperList, signIn, signUp } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/developers', getDeveloperList);

export default router;