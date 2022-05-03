//SJSU CMPE 138 Spring 2022 TEAM3 

import express from 'express';
import { addBug } from '../controllers/bugController.js';

const router = express.Router();
router.post('/new', addBug);


export default router;