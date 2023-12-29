import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AddPostScreen from "./screens/AddPostScreen.jsx";
import EditPostScreen from "./screens/EditPostScreen.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/login" element={<LoginScreen />} />
			<Route path="" element={<PrivateRoute />}>
				<Route index={true} path="/" element={<HomeScreen />} />
				<Route path="/add" element={<AddPostScreen />} />
				<Route path="/:postId" element={<EditPostScreen />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
