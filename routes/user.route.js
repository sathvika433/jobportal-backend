import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { parseResume } from "../controllers/parseResumeController.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/parse-resume").post(isAuthenticated, singleUpload, parseResume); // ✅ Only once

export default router;
