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
app.use(sessionMiddleware);
app.use(csrf({ cookie: true }));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from any origin
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
};
app.use(cors(corsOptions));

// intercept OPTIONS method
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("CSRF TOKEN:", req.session.csrfToken);
  next();
});

// services
app.use("/csrf", csrfToken);
app.use("/contact", contact);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: true,
  })
);

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
