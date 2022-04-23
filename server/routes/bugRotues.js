import express from 'express';
import { addBug } from '../controllers/bugController.js';

const router = express.Router();
router.post('/new', addBug);


export default router;