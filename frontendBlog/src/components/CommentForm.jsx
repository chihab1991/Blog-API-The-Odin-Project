import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComment } from "../slices/postSlice";
import { useAddCommentMutation } from "../slices/postsApiSlice";
import { useParams } from "react-router-dom";

const CommentForm = () => {
	const [text, setText] = useState("");
	const [author, setAuthor] = useState("");
	const dispatch = useDispatch();
	const { postId } = useParams();
	const { post } = useSelector((state) => state.post);
	const [addComment, { isLoading }] = useAddCommentMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log({ id: postId, data: { author, text } });
		try {
			const res = await addComment({
				id: postId,
				data: { author, text },
			}).unwrap();
			dispatch(setComment(res));
			setAuthor("");
			setText("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="author">
						<input
							type="text"
							name="author"
							id="author"
							value={author}
							placeholder="Type your name or username"
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="comment"></label>
					<textarea
						name="comment"
						id="comment"
						placeholder="Please write your comment here...."
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</div>
				<button type="submit">Add Comment</button>
			</form>
		</>
	);
};
export default CommentForm;
