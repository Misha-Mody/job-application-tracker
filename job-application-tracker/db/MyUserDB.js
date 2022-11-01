import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
  const DB_NAME = "jobtracker";
  const COL_NAME = "users";

  // get Users
  myDB.getAllUsers = async () => {
    console.log("db");
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      const u = await col.find().toArray();
      console.log(u);
      return u;
    } finally {
      client.close();
    }
  };


  //get user profile information
  myDB.getProfileByID = async (userID) => {
    console.log("db profile id =", userID);
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      const u = await col.find({ "_id": ObjectId(userID) }).toArray();
      console.log(u);
      if (u.length < 1) return null;
      else return u;
    } finally {
      client.close();
    }

  };

  //create user
  myDB.createUser = async (user) => {
    console.log("create user");
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.insertOne({ 
        name: user.name, 
        email: user.email, 
        address: user.address,
        about: "",
        skills: "",
        hobbies: "",
        education: "",
        experience: "" ,
        project: "xyz" });
    }
    finally{
      client.close();
    }
  };

   //EdIT USER 
  myDB.editProfile = async (users) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      console.log(users);
      return await col.updateOne({ "_id":ObjectId(users._id)}, {
        $set: {
          userId: users.userId,
          name: users.name,
          email: users.email,
          address: users.address,
          about: users.about,
          skills: users.skills,
          hobbies: users.hobbies,
          education: users.education,
          experience: users.experience,
          project: users.project,
        }

      });
    } finally {
      client.close();
    }
  };

  //delete
  myDB.deleteProfile = async (userId) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.deleteOne({ "_id": ObjectId(userId) });
    } finally {
      client.close();
    }
  };

  return myDB;
}

export default MyMongoDB();
  


//----------OLD-------------------------


/*  myDB.getUserById = async (userId) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ _id: parseInt(userId) }).toArray();
    } finally {
      client.close();
    }
  };
*/

 

  //delete
  


//   usersDB.createUser() = async (users) => {
//     let client;
//     try {
//       client = new MongoClient(mongoURL);
//       const col = client.db(DB_NAME).collection(COL_NAME);
//       return await col.insertOne({
//         userId: (await getUserCount()) + 1,
//         name: users.name,
//         email: users.company,
//         address: users.address,
//         about: users.about,
//         skills: users.skills,
//         hobbies: users.hobbies,
//         education: users.education,
//         experience: users.experience,
//         project: users.project,
//         profile_img: users.profile_img,
//       });
//     } finally {
//       client.close();
//     }
//   };

//   return usersDB;
// }