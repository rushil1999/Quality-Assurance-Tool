import express from "express";
import { addProject, getProjectsBasedOnId, getProjectsBasedOnManager, getTotalProjectCount } from "../controllers/projectController.js";
const router = express.Router();

router.post('/new', addProject);
router.get('/manager/:manager_id', getProjectsBasedOnManager);
router.get('/details/:p_id', getProjectsBasedOnId);
router.get('/count', getTotalProjectCount);


export default router;