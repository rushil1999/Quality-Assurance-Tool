import express from "express";
import { addProject, getProjectsBasedOnId, getProjectsBasedOnManager } from "../controllers/projectController.js";
const router = express.Router();

router.post('/new', addProject);
router.get('/manager/:manager_id', getProjectsBasedOnManager);
router.get('/details/:p_id', getProjectsBasedOnId);


export default router;