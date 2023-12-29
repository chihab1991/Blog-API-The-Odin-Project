import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`mongoDb Connected on: ${conn.connection.host} `);
	} catch (error) {
		console.error(`Error ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
