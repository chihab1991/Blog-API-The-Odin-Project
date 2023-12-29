import { Link } from "react-router-dom";
import { format } from "date-fns";
const Hero = ({ posts }) => {
	return (
		<>
			{posts?.map((post) => {
				return (
					<div key={post._id}>
						<h3>{post.title}</h3>
						<p>{post.content.slice(0, 20)}...</p>
						<p>Added on: {format(post.createdAt, "dd MMM yyyy")}</p>
						<Link to={`/${post._id}`}>Read more...</Link>
					</div>
				);
			})}
		</>
	);
};
export default Hero;
