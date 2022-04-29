import express from "express";
import { addComponent, getComponentsBasedOnProject, getComponentsBasedOnTestLead, getTotalComponentCount } from "../controllers/componentController.js";
const router = express.Router();

router.post('/new', addComponent);
router.get('/project/:project_id', getComponentsBasedOnProject);
router.get('/test_lead/:testlead_id', getComponentsBasedOnTestLead);
router.get('/count', getTotalComponentCount);

export default router;