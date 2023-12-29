import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostMutation } from "../slices/postsApiSlice";
import { useEditPostMutation } from "../slices/postsApiSlice";
const EditPostScreen = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(null);
	const [comments, setComments] = useState(null);
	const navigate = useNavigate();
	const { postId } = useParams();
	const [getPost, { isLoading }] = useGetPostMutation();
	const [editPost] = useEditPostMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			title,
			content,
			published,
		};
		try {
			const res = await editPost({ id: postId, data });
			if (res.data.title) {
				navigate("/");
			}
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
	};

	useEffect(() => {
		const postGetter = async () => {
			try {
				const res = await getPost(postId).unwrap();
				console.log(res.title);
				setTitle(res.title);
				setContent(res.content);
				setPublished(res.published);
				setComments(res.comments);
			} catch (err) {
				console.log(err?.data?.message || err.error);
			}
		};
		postGetter();
	}, []);
	return (
		<>
			{isLoading && <p>still loading the post!</p>}
			{!isLoading && (
				<>
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
							<label htmlFor="published">Publish ?:</label>
							<select
								name="published"
								id="published"
								onChange={(e) =>
									e.target.value === "yes"
										? setPublished(true)
										: setPublished(false)
								}
								value={published === true ? "yes" : "no"}
							>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
						</div>
						<button type="submit">Add New Post</button>
					</form>
					{/* // comments */}
					<div>
						<h3>Comment</h3>
					</div>
				</>
			)}
		</>
	);
};
export default EditPostScreen;
