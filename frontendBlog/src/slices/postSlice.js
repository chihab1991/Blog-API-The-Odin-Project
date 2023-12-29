import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	post: null,
};

const postsSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPost: (state, action) => {
			state.post = action.payload;
		},
		setComment: (state, action) => {
			state.post.comments.push(action.payload.comment);
		},
	},
});

export const { setPost, setComment } = postsSlice.actions;

export default postsSlice.reducer;
