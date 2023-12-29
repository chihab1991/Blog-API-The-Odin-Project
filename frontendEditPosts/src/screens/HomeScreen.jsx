import Hero from "../components/Hero";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsMutation } from "../slices/postsApiSlice";
import { setPosts } from "../slices/postsSlice";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const [getAllPosts, { isLoading }] = useGetAllPostsMutation();
	const { posts } = useSelector((state) => state.posts);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const res = await getAllPosts().unwrap();
				dispatch(setPosts([...res]));
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, []);
	return (
		<>
			{isLoading && <h2>Currently Loading Posts..</h2>}
			{!isLoading && posts && <Hero posts={posts} />}
		</>
	);
};
export default HomeScreen;
