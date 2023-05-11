import cors from "cors";
import csrf from "csurf";
import chalk from "chalk";
import helmet from "helmet";
import express from "express";
import "./loadEnvironment.mjs";
import config from "config";
import contact from "./routes/contact.mjs";
import csrfToken from "./routes/csrfToken.mjs";
import logger from "./logger.mjs";
import { sessionMiddleware } from "./db/sessionConn.mjs";
import cookieParser from "cookie-parser";

logger.info("Starting server ...");

const app = express();

// config
const PORT = process.env.PORT || config.app.port;
const link = `${config.app.secure ? "https//" : "http//"}${
  config.app.host
}:${PORT}`;

// Configuration de la session
app.use(cookieParser());
app.use(await sessionMiddleware);
app.use(csrf({ cookie: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// services
app.use("/contact", contact);
app.use("/csrf", csrfToken);

// Démarrer le serveur
app.listen(PORT, () => {
  logger.debug(`_`.repeat(60));
  logger.debug(" ");
  logger.debug(`Serveur en cours d'exécution sur le port ${PORT}`);
  logger.debug(`Lien : ${chalk.blue(link)}`);
  logger.debug(" ");
  logger.info("Server started.");
});

export default app;
