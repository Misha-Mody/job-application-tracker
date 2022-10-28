import express from "express";
import myDB from "../db/MyMongoDB.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
});

/* GET applied jobs page. */
router.get("/applied", async function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/applied.html"));
});

router.get("/getAppliedjobs", async (req, res) => {
  const jobs = await myDB.getAppliedCompany();
  return res.json(jobs);
});
router.get("/getAssessmentjobs", async (req, res) => {
  const jobs = await myDB.getAssessmentCompany();
  return res.json(jobs);
});
router.get("/getInterviewjobs", async (req, res) => {
  const jobs = await myDB.getInterviewCompany();
  return res.json(jobs);
});
router.get("/getStatusjobs", async (req, res) => {
  const jobs = await myDB.getStatusCompany();
  return res.json(jobs);
});

// delete job with jobid

router.get("/delete/:jobid", async (req, res) => {
  const jobid = req.params.jobid;
  console.log("here", jobid);
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

export default router;
