import { Router } from "express";
import { changeStatus, collection, collectiontodo, deletecollection, deletetodo, updateTask } from "../controller/task.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/task/:collection").post(verifyJwt, collectiontodo);
router.route("/collection").post(verifyJwt, collection);
router.route("/status").post(verifyJwt, changeStatus);
router.route("/deletetodo").post(verifyJwt, deletetodo)
router.route("/deletecollection").post(verifyJwt, deletecollection);
router.route("/updatetask").post(verifyJwt, updateTask);

export default router;