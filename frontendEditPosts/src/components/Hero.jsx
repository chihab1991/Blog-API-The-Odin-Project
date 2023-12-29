import PostComponent from "./PostComponent";

const Hero = ({ posts }) => {
	return (
		<>
			{!posts && <h2>No Posts Added yet...</h2>}
			{posts &&
				posts?.map((post) => {
					return <PostComponent key={post._id} post={post} />;
				})}
		</>
	);
};
export default Hero;
