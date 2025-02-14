import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, removeJobById } from '../controllers/job.controller.js';



const router = express.Router();


router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get( getAllJobs)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)
router.route("/remove/:id").delete(isAuthenticated, removeJobById)

export default router;