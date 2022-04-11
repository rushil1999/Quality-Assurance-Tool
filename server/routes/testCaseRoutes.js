import express from "express";
import { addTestCase } from "../controllers/testCaseController.js";

const router = express.Router();

router.post('/new', addTestCase);

export default router;