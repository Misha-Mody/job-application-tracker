import { MongoClient } from "mongodb";

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
  const DB_NAME = "jobtracker";
  const COL_NAME = "company";

  // get jobs

  myDB.getAppliedCompany = async (query, page, pageSize) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col
        .find({ phase: 1, company: new RegExp(query) })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ jobid: -1 })
        .toArray();
    } finally {
      client.close();
    }
  };
  myDB.getAssessmentCompany = async (query, page, pageSize) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col
        .find({ phase: 2, company: new RegExp(query) })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ jobid: -1 })
        .toArray();
    } finally {
      client.close();
    }
  };
  myDB.getInterviewCompany = async (query, page, pageSize) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col
        .find({ phase: 3, company: new RegExp(query) })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ jobid: -1 })
        .toArray();
    } finally {
      client.close();
    }
  };
  myDB.getStatusCompany = async (query, page, pageSize) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col
        .find({ phase: 4, company: new RegExp(query) })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ jobid: -1 })
        .toArray();
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
      return await col.find({ jobid: parseInt(jobid) }).toArray();
    } finally {
      client.close();
    }
  };

  // get counts

  const getJobCount = async (query) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      const count = await col.countDocuments();
      return count;
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
      await col.deleteOne({ jobid: parseInt(jobid) });
      return;
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

  //update job
  myDB.updateJob = async (jobid, job) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.updateOne(
        { jobid: parseInt(jobid) },
        {
          $set: {
            jobid: (await getJobCount()) + 1,
            company: job.company,
            posname: job.posname,
            applieddate: job.applieddate,
            assessmentdate: job.assessmentdate,
            interviewdate: job.interviewdate,
            status: job.status,
            phase: parseInt(job.phase),
            img: job.img,
          },
        }
      );
    } finally {
      client.close();
    }
  };

  // update status
  myDB.updateJobPhase = async (jobid, phase) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.updateOne(
        { jobid: parseInt(jobid) },
        {
          $set: {
            phase: parseInt(phase),
          },
        }
      );
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MyMongoDB();
