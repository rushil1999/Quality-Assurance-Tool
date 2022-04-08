import express from "express";
import { addProject, getProjectsBasedOnManager } from "../controllers/projectController.js";
const router = express.Router();

router.post('/new', addProject);
router.get('/manager/:manager_id', getProjectsBasedOnManager);


export default router;