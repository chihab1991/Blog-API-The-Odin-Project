import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

// @desc get all Posts
// route get /api/posts
// @access Public

const allPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({ published: true }).populate("comments");
	res.status(200).json(posts);
});
// @desc get single Post
// route get /api/posts.:id
// @access Public

const viewPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (post) {
		const comments = await Comment.find({ _id: { $in: post.comments } });
		res.status(200).json({ post, comments });
	}
});
// @desc add comment
// route Post /api/posts/:id
// @access Public

const addComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log(req.body);
	const { author, text } = req.body;
	const post = await Post.findById(id);
	const comment = await Comment.create({ author, text });
	if (post && comment) {
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: id },
			{ $push: { comments: comment._id } }
		);
		if (updatedPost) {
			res.status(200).json({ updatedPost, comment });
		}
	}

	// res.status(200).json({ message: `Post comment on post Id:${id}` });
});
export { allPosts, viewPost, addComment };
