import express from "express";
import {
	addComment,
	allPosts,
	viewPost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/", allPosts);
router.get("/:id", viewPost);
router.post("/:id", addComment);

export default router;
