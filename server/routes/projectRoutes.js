import express from "express";
import { createProject } from "../controllers/projectController.js";
const router = express.Router();

router.get('/new', createProject);


export default router;