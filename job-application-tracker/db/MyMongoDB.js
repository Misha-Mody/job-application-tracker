import { MongoClient } from "mongodb";

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
  const DB_NAME = "jobtracker";
  const COL_NAME = "company";

  // get jobs

  myDB.getAppliedCompany = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ phase: 1 }).sort({ jobid: -1 }).toArray();
    } finally {
      client.close();
    }
  };
  myDB.getAssessmentCompany = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ phase: 2 }).sort({ jobid: -1 }).toArray();
    } finally {
      client.close();
    }
  };
  myDB.getInterviewCompany = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ phase: 3 }).sort({ jobid: -1 }).toArray();
    } finally {
      client.close();
    }
  };
  myDB.getStatusCompany = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ phase: 4 }).sort({ jobid: -1 }).toArray();
    } finally {
      client.close();
    }
  };

  // delete jobs
  myDB.deleteJob = async (jobid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      console.log("here2", jobid);
      await col.deleteOne({ jobid: parseInt(jobid) });
      console.log("done");
      return;
    } finally {
      client.close();
    }
  };

  const getJobCount = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      const count = await col.find().count();
      console.log(count);
      return count;
    } finally {
      client.close();
    }
  };

  // create job

  myDB.createJob = async (job) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.insertOne({
        jobid: (await getJobCount()) + 1,
        company: job.company,
        posname: job.posname,
        applieddate: job.applieddate,
        assessmentdate: job.assessmentdate,
        interviewdate: job.interviewdate,
        status: job.status,
        phase: parseInt(job.phase),
        img: job.img,
      });
    } finally {
      client.close();
    }
  };

  // get job by id
  myDB.getJob = async (jobid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ jobid: jobid });
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MyMongoDB();
