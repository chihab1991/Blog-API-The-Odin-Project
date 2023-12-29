import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.mutation({
			query: () => ({
				url: `${POSTS_URL}`,
				method: "GET",
			}),
		}),
		getPost: builder.mutation({
			query: (id) => ({
				url: `${POSTS_URL}/${id}`,
				method: "GET",
			}),
		}),
		addComment: builder.mutation({
			query: ({ id, data }) => ({
				url: `${POSTS_URL}/${id}`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});
export const {
	useGetAllPostsMutation,
	useGetPostMutation,
	useAddCommentMutation,
} = postsApiSlice;
