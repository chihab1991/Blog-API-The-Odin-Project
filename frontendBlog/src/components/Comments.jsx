import { intlFormatDistance } from "date-fns";

const Comments = ({ comments }) => {
	return (
		<>
			<h3>Comments:</h3>
			{!comments && <p>no one has commented this post yet.</p>}
			<ul>
				{comments &&
					comments.map((comment) => {
						console.log(comment);
						return (
							<li key={comment._id}>
								{comment.text} by <b>{comment.author}</b>
								<span>
									{" "}
									{intlFormatDistance(comment.createdAt, new Date())}
								</span>
							</li>
						);
					})}
			</ul>
		</>
	);
};
export default Comments;
