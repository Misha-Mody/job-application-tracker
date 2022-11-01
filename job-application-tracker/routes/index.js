import express from "express";
import myDB from "../db/MyMongoDB.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import userRoute from "./user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.use("/", userRoute);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
});

/* GET applied jobs page. */
router.get("/applied", async function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/applied.html"));
});

// get jobs

router.get("/getAppliedjobs", async (req, res) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.total || 10;
  // let total = await myDB.getJobCount(query);
  const jobs = await myDB.getAppliedCompany(query, page, pageSize);
  return res.json(jobs);
});
router.get("/getAssessmentjobs", async (req, res) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.total || 10;
  // let total = await myDB.getRestaurantCount(query);
  const jobs = await myDB.getAssessmentCompany(query, page, pageSize);
  return res.json(jobs);
});
router.get("/getInterviewjobs", async (req, res) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.total || 10;
  // let total = await myDB.getRestaurantCount(query);
  const jobs = await myDB.getInterviewCompany(query, page, pageSize);
  return res.json(jobs);
});
router.get("/getStatusjobs", async (req, res) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.total || 10;
  // let total = await myDB.getRestaurantCount(query);
  const jobs = await myDB.getStatusCompany(query, page, pageSize);
  return res.json(jobs);
});

// delete job with jobid

router.get("/delete/:jobid", async (req, res) => {
  const jobid = req.params.jobid;
  await myDB.deleteJob(jobid);
  res.redirect("/applied");
});

//create job

router.post("/createJob", async (req, res) => {
  let job = req.body;
  let phase = parseInt(job.process);
  let status = "Not Selected";
  if (job.process == "5") {
    phase = 4;
    status = "Selected";
  }
  job["status"] = status;
  job["phase"] = phase;
  job["img"] = "http://dummyimage.com/189x100.png/5fa2dd/ffffff";
  delete job.process;

  await myDB.createJob(job);

  res.redirect("/applied");
});

// get job by id
router.get("/get/:jobid", async (req, res) => {
  const jobid = req.params.jobid;
  const job = await myDB.getJob(jobid);
  return res.json(job);
});

function formatDate(date) {
  let d = date.split("-");
  return d[1] + "/" + d[2] + "/" + d[0];
}

//update job
router.post("/update/:jobid", async (req, res) => {
  const jobid = req.params.jobid;
  const job = req.body;
  let phase = parseInt(job.process);
  let status = "Not Selected";
  if (job.process == "5") {
    phase = 4;
    status = "Selected";
  }
  job["status"] = status;
  job["phase"] = phase;
  delete job.process;
  job["img"] = "http://dummyimage.com/189x100.png/5fa2dd/ffffff";

  job["applieddate"] = formatDate(job["applieddate"]);
  job["assessmentdate"] = formatDate(job["assessmentdate"]);
  job["interviewdate"] = formatDate(job["interviewdate"]);
  console.log(job);
  await myDB.updateJob(jobid, job);
  res.redirect("/applied");
});

// update job phase
router.get("/update/:jobid/:phase", async (req, res) => {
  const jobid = req.params.jobid;
  const phase = req.params.phase;
  await myDB.updateJobPhase(jobid, phase);
  res.redirect("/applied");
});

export default router;
