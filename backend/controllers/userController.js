import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc Auth user/set token
// route POST /api/users/signin
// access Public
const loginUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body;
	const user = await User.findOne({ name });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({ _id: user._id, name: user.name, email: user.email });
	} else {
		res.status(401);
		throw new Error("Invalid email or password.");
	}
});

// @desc Register a new user
// route POST /api/users/
// access Public
// To be Used Ones to create the Blog Admin
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({ _id: user._id, name: user.name, email: user.email });
	} else {
		res.status(400);
		throw new Error("Invalid user data.");
	}
});

// @desc Logout user
// route POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User logged out" });
});

export { loginUser, registerUser, logoutUser };
