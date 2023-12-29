import { Link } from "react-router-dom";

const PostComponent = ({ post }) => {
	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.content.slice(0, 20)}...</p>
			<h4>Status: {post.published ? "Published" : "Not Published"}</h4>
			<Link to={`/${post._id}`}> Edit</Link>
		</>
	);
};
export default PostComponent;
