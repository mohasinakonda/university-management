import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
console.log(config.db_url);

async function main() {
	try {
		await mongoose.connect(config.db_url as string);
		app.listen(config.port, () => {
			console.log(`server is running on port ${config.port}`);
		});
		console.log("db connected!");
	} catch (err) {
		console.log("failed to db connect", err);
	}
}

main();
