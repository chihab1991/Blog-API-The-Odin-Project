const Article = ({ post }) => {
	return (
		<>
			<article>
				<h2>{post.post.title}</h2>
				<p>{post.post.content}</p>
			</article>
		</>
	);
};
export default Article;
