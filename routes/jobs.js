const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobs");

// Route for creating a new job and getting all jobs
router.route("/").post(createJob).get(getAllJobs);
// Route for getting, deleting, and updating a specific job by ID
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
