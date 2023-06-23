import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import logger from "./shared/logger/logger";

async function main() {
    try {
        await mongoose.connect(config.db_url as string);
        // await client.connect();
        app.listen(config.port, () => {
            logger.info(`server is running on port ${config.port}`);
        });
        logger.info("db connected!");
    } catch (err) {
        logger.error("failed to db connect", err);
    }
}

main();
