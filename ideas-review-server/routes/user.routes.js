import { Router } from "express";
// import { createUser,loginUser,getCurrentUser, getAllVendors, getUserName } from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { addTalks, addUser, addVote, deleteTalk, deleteUser, getAllTalks, getAllUsers, getTalks, loginUser, updateTalkStatus } from "../controllers/user.controller.js";
import { adminCheck } from "../middlewares/adminCheck.middleware.js";

const router = Router();

router.route("/login").post(authCheck,loginUser);

// Admin Routes
router.route("/addUser").post(authCheck,adminCheck,addUser);
router.route("/getUsers").get(authCheck,adminCheck,getAllUsers);
router.route("/deleteUser").delete(authCheck,adminCheck,deleteUser);
router.route("/addTalks").post(authCheck,adminCheck,addTalks);
router.route("/getAllTalks").get(authCheck,adminCheck,getAllTalks);
router.route("/deleteTalk").delete(authCheck,adminCheck,deleteTalk);
router.route("/updateTalkStatus").post(authCheck,adminCheck,updateTalkStatus);


// Member Routes
router.route("/getTalks").get(authCheck,getTalks);
router.route("/addVote").post(authCheck,addVote);

export default router;
