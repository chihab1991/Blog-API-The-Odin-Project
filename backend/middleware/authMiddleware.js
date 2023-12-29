import jwt from "jsonwebtoken";
import asyncHandle from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandle(async (req, res, next) => {
	let token;
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			s.status(401);
			throw new Error("Not Authorized, invalid token!!");
		}
	} else {
		res.status(401);
		throw new Error("Not Authorized, no token!!");
	}
});

export { protect };
