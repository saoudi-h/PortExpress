import cors from "cors";
import csrf from "csurf";
import chalk from "chalk";
import crypto from "crypto";
import helmet from "helmet";
import express from "express";
import "./loadEnvironment.mjs";
import config from "config";
import session from "express-session";
import contact from "./routes/contact.mjs";
import csrfToken from "./routes/csrfToken.mjs";
import logger from "./logger.mjs";

logger.info("Starting server ...");

const app = express();

// config

const PORT = config.app.port;
const link = `http://${config.app.host}:${PORT}`;
const secretSession = crypto.randomBytes(64).toString("hex");

// Configuration de la session
app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: false,
    },
  })
);

app.use(csrf({}));
app.use(
  cors({
    origin: true,
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
