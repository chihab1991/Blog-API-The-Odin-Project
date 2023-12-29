import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 3,
		},
		content: { type: String, required: true, minLength: 10 },
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],

		published: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
