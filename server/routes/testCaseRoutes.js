import express from "express";
import { addTestCase, getTestCasesBasedOnComponent, getTestCasesBasedOnTester, getTotalTestCaseCount } from "../controllers/testCaseController.js";

const router = express.Router();

router.post('/new', addTestCase);
router.get('/count', getTotalTestCaseCount);
router.get('/tester/:tester_id', getTestCasesBasedOnTester);
router.get('/component/:component_id', getTestCasesBasedOnComponent);

export default router;