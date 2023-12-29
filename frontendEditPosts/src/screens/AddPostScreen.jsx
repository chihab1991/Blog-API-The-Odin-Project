import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewPostMutation } from "../slices/postsApiSlice";
import { addPost } from "../slices/postsSlice";

// title, content, published
const AddPostScreen = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addNewPost, { isLoading }] = useAddNewPostMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		if (!title || !content) {
			setError("Please fill all fields.");
			return;
		}
		try {
			await addNewPost({ title, content, published }).unwrap();
			navigate("/");

			// dispatch(addPost(res));
		} catch (err) {
			setError(err?.data?.message || err.error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="content">Content: </label>
				<textarea
					name="content"
					id="content"
					cols="30"
					rows="10"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></textarea>
			</div>
			<div>
				<label htmlFor="published">Publish? </label>
				<select
					name="published"
					id="published"
					onChange={(e) =>
						e.target.value === "yes" ? setPublished(true) : setPublished(false)
					}
				>
					<option value="no">No</option>
					<option value="yes">Yes</option>
				</select>
			</div>
			<button type="submit">Add New Post</button>
			{error && <p>{error}</p>}
		</form>
	);
};
export default AddPostScreen;
