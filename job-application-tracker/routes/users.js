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
  const user = await myDB.getAllUsers();
  return res.json(user);
});

//get users profile information
router.get("/getProfileByID/:id", async (req, res) => {
  const userID = req.params.id;
  const profile = await myDB.getProfileByID(userID);
  return res.json(profile);
});

//create a new user
router.post("/createUser", async (req, res) => {
  const user = req.body;
  await myDB.createUser(user);
  res.redirect("/");
});

/*edit*/
router.post("/editProfile", async function (req, res, next) {
  const u = req.body;
  await myDB.editProfile(u);
  res.redirect("/");
});

/* delete */
router.get("/deleteProfile/:id", async function (req, res, next) {
  const u = req.params.id;
  await myDB.deleteProfile(u);
  res.redirect("/");
});

export default router;
