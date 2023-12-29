import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../slices/postSlice";
import { useGetPostMutation } from "../slices/postsApiSlice";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";

const PostScreen = () => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const [getPost, { isLoading }] = useGetPostMutation();
	const { post } = useSelector((state) => state.post);
	useEffect(() => {
		const postGetter = async () => {
			const res = await getPost(postId).unwrap();
			dispatch(setPost(res));
		};

		postGetter();
	}, [dispatch, postId, getPost]);
	return (
		<>
			{isLoading && <h3>Still Loading...</h3>}
			{post && (
				<>
					<Article post={post} />
					<Comments comments={post.comments} />
					<CommentForm />
				</>
			)}
		</>
	);
};
export default PostScreen;
