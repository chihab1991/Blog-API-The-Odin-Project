import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

// @desc get get all posts
// route get /api/posts/editer/
// @access Private
const allPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find().populate("comments");
	if (posts) {
		res.status(200).json(posts);
	} else {
		res.status(401).json({ message: "something went wrong" });
	}
});
// @desc post add new Post
// route POST /api/posts/editer/add
// @access Private

const addPost = asyncHandler(async (req, res) => {
	const { title, content, published } = req.body;
	const titleExists = await Post.findOne({ title });
	if (titleExists) {
		res.status(401).json({ message: "Title Already in use!!" });
	} else {
		const post = await Post.create({ title, content, published });
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(401).json({ message: "invalid something" });
		}
	}
});
const getPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(401).json({ message: "Article does not exist!!!" });
	}
});
const editPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (post) {
		post.title = req.body.title || post.title;
		post.content = req.body.content || post.content;
		post.published = req.body.published || post.published;
		await post.save();
		res.status(200).json(post);
	} else {
		res.status(401).json({ message: "Article does not exist!!!" });
	}
});
const deletePost = asyncHandler(async (req, res) => {
	// delete post and all its related comments

	const { id } = req.params;
	const post = await Post.findById(id);
	console.log(post);
	if (post) {
		// await Comment.deleteMany({
		// _id: { $in: post.comments },
		// });
		await Post.deleteOne({ _id: id });
	} else {
		res.status(401).json({ message: "Article does not exist!!!" });
	}
});
const deleteComment = asyncHandler(async (req, res) => {
	// delete comment and delete from post.comments
	const { commentId, postId } = req.body;
	const post = await Post.findById(postId);
	// const comment = await Comment.findById(commentId);
	if (post) {
		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { comments: commentId } }
		);
		// await Comment.findByIdAndDelete(commentId);
		res.status(200).json({ message: "Successfully deleted comment!!" });
	} else {
		res.status(401).json({ message: "Article or Comment does not exist!!" });
	}
});
export { allPosts, addPost, getPost, editPost, deletePost, deleteComment };
