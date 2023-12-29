import express from "express";
import {
	addPost,
	editPost,
	getPost,
	deletePost,
	deleteComment,
	allPosts,
} from "../controllers/postEditerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, allPosts);
router.get("/:id", protect, getPost);
router.post("/add", protect, addPost);
router.put("/:id", protect, editPost);
router.delete("/deletecomment", protect, deleteComment);
router.delete("/:id", protect, deletePost);

export default router;
