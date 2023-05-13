import session from "express-session";
import MongoStore from "connect-mongo";
import config from "config";
// import crypto from "crypto";
// const secretSession = crypto.randomBytes(64).toString("hex");

const sessionStorePromise = MongoStore.create({
  mongoUrl: config.db.connectionString,
  dbName: config.db.name,
  ttl: 14 * 24 * 60 * 60, // durée de vie de la session en secondes (14 jours)
});

let sessionStore;

try {
  sessionStore = await sessionStorePromise;
} catch (error) {
  console.error(`Failed to create session store: ${error.message}`);
}
const sessionConfig = {
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: config.session.duration,
    secure: config.env === "development" ? true : false,
    httpOnly: config.env === "development" ? true : false,
    sameSite: "none",
  },
  store: sessionStore,
};

export const sessionMiddleware = session(sessionConfig);
