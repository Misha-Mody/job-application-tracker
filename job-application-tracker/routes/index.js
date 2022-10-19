var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});

/* GET applied jobs page. */
router.get("/applied", function (req, res, next) {
  let jobs = [
    {
      jobid: "1",
      company: "Actually",
      posname: "Software Engineer",
      applieddate: "Oct 18th, 2022",
      assessmentdate: null,
      interviewdate: null,
      status: "progress",
      phase: 1,
      img: "c1.png",
    },
    {
      jobid: "1",
      company: "Palo Alto Networks",
      posname: "Software Engineer",
      applieddate: "Oct 18th, 2022",
      assessmentdate: null,
      interviewdate: null,
      status: "progress",
      phase: 2,
      img: "c1.png",
    },
    {
      jobid: "1",
      company: "Google",
      posname: "Software Engineer",
      applieddate: "Oct 18th, 2022",
      assessmentdate: null,
      interviewdate: null,
      status: "progress",
      phase: 3,
      img: "c1.png",
    },
    {
      jobid: "1",
      company: "Amazon",
      posname: "Software Engineer",
      applieddate: "Oct 18th, 2022",
      assessmentdate: null,
      interviewdate: null,
      status: "Not Selected",
      phase: 4,
      img: "c1.png",
    },
    {
      jobid: "1",
      company: "MongoDB",
      posname: "Software Engineer",
      applieddate: "Oct 18th, 2022",
      assessmentdate: null,
      interviewdate: null,
      status: "progress",
      phase: 1,
      img: "c1.png",
    },
  ];

  res.render("applied", {
    jobs: jobs,
  });
});

module.exports = router;
