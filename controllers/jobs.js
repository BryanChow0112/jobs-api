const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Get all jobs for a user
const getAllJobs = async (req, res) => {
  // Get all jobs for the user and sort by creation date
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  // Send response with status, jobs and count
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// Get a single job by ID
const getJob = async (req, res) => {
  // Get user ID and job ID from request
  const {
    user: { userId },
    params: { id: jobId }
  } = req;

  // Find a job by ID and user ID
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // Send response with status and job
  res.status(StatusCodes.OK).json({ job });
};

// Create a new job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body); // Create job in DB
  // Send response with status and created job
  res.status(StatusCodes.CREATED).json({ job });
};

// Updates an existing job
const updateJob = async (req, res) => {
  // Get company, position, user ID and job ID from request
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId }
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  // Find a job by ID and user ID, update it with new data
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // Send response with status and updated job
  res.status(StatusCodes.OK).json({ job });
};

// Deletes a job
const deleteJob = async (req, res) => {
  // Get user ID and job ID from request
  const {
    user: { userId },
    params: { id: jobId }
  } = req;

  // Find a job by ID and user ID, remove it
  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob
};
