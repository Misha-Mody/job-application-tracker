import express from "express";
import myDB from "../db/MyUserDB.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import indexroute from "./index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

/* GET page with all users */
router.get("/getUserList", async function (req, res, next) {
  console.log("routes");
  const user = await myDB.getAllUsers();
  return res.json(user);
});


//get users profile information
router.get("/getProfileByID/:id", async (req,res) => {
  console.log("in get user profile");
  const userID = req.params.id;

  console.log("routers id = ",userID);
  
  const profile = await myDB.getProfileByID(userID);
  //console.log(profile);

  return res.json(profile);
});

//create a new user
router.post("/createUser", async (req,res) => {
  console.log("in create user");
  const user = req.body;
  await myDB.createUser(user);
  res.redirect("/");
});

/*edit*/
router.post("/editProfile", async function (req, res, next) {
  console.log("in users.js editProfile");
  const u = req.body;
  console.log(u);
  await myDB.editProfile(u);
  res.redirect("/");
});

/* delete */
router.get("/deleteProfile/:id", async function (req, res, next) {
  console.log("in users.js delete");
  const u = req.params.id;
  console.log(u);

  await myDB.deleteProfile(u);
  
  res.redirect("/");
});


//----OLD CODE------

/* GET users page.
router.get("/getUser", async function (req, res, next) {
  const user = await myDB.getUser();
  return res.json(user);
});

*/


/*//get profile page for the user
router.get("/view/:userId", async function (req, res, next) {
  const userId = req.params.body;
  const user = await myDB.getUserById(userId);

  //res.redirect("/profile");
  //res.sendFile(path.join(__dirname + "/../views/profile.html"));

  //return res.json(user);
});*/


export default router;