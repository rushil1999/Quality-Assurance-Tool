import express from "express";
import { addProject, getProjectBasedOnId, getProjects, getProjectsBasedOnManager, getTotalProjectCount } from "../controllers/projectController.js";
const router = express.Router();

router.post('/new', addProject);
router.get('/manager/:manager_id', getProjectsBasedOnManager);
router.get('/details/:p_id', getProjectBasedOnId);
router.get('/count', getTotalProjectCount);
router.get('/all', getProjects);



export default router;


