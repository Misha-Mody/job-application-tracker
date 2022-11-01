import express from "express";
import myDB from "../db/MyUserDB.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

/* GET home page. */
router.get("/getUser", async function (req, res, next) {
  const user = await myDB.getUser();
  return res.json(user);
});

export default router;
