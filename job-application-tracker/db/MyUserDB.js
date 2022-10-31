import { MongoClient } from "mongodb";

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
  const DB_NAME = "jobtracker";
  const COL_NAME = "users";

  // get jobs

  myDB.getUser = async () => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find().toArray();
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MyMongoDB();
