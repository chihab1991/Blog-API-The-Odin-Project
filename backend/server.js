import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import postRoutes from "./router/postRoutes.js";
import postEditerRoutes from "./router/postEditerRoutes.js";
import userRoutes from "./router/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/user/", userRoutes);
app.use("/api/posts/editer/", postEditerRoutes);
app.use("/api/posts/", postRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
