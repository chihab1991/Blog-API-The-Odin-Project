import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsMutation } from "../slices/postsApiSlice";
import { useEffect } from "react";
import { setPosts } from "../slices/postsSlice";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const [getAllPosts, { isLoading }] = useGetAllPostsMutation();
	const { posts } = useSelector((state) => state.posts);

	useEffect(() => {
		const postsGetter = async () => {
			try {
				const res = await getAllPosts().unwrap();
				dispatch(setPosts(res));
			} catch (error) {
				console.log(error);
			}
		};

		postsGetter();
	}, []);
	return (
		<>
			{isLoading && <div>still loading posts.....</div>}
			{posts && <Hero posts={posts} />}
		</>
	);
};
export default HomeScreen;
