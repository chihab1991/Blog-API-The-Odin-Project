import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema(
	{
		author: { type: String, required: true, minLength: 3 },
		text: { type: String, required: true, minLength: 3 },
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
