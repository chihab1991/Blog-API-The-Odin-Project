import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/posts/editer";

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.mutation({
			query: () => ({
				url: `${POSTS_URL}/`,
				method: "GET",
			}),
		}),
		addNewPost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/add`,
				method: "POST",
				body: data,
			}),
		}),
		getPost: builder.mutation({
			query: (id) => ({
				url: `${POSTS_URL}/${id}`,
				method: "GET",
			}),
		}),
		editPost: builder.mutation({
			query: ({ id, data }) => ({
				url: `${POSTS_URL}/${id}`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllPostsMutation,
	useAddNewPostMutation,
	useGetPostMutation,
	useEditPostMutation,
} = postsApiSlice;
