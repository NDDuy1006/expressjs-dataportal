import express from "express";
import config from 'config';
import logger from "./utils/logger";
import routes from "./routes";

const PORT = config.get<number>('port');

const app = express();

app.listen(PORT, async () => {
  logger.info(`The app is running on port ${PORT}`);


  routes(app);
});