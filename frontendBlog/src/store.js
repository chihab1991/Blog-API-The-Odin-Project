import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import postReducer from "./slices/postSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		posts: postsReducer,
		post: postReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
