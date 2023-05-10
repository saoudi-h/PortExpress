import { MongoClient } from "mongodb";
import config from "config";
import logger from "../logger.mjs";

// const connectionString = `${config.db.scheme}://${config.db.userName}:${encodeURIComponent(
//   config.db.userPwd
// )}@${config.db.host}${config.db.port===''?'':':'+config.db.port}/${config.db.name}`;

const client = new MongoClient(config.db.connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  logger.error(e);
}

let db = conn.db(config.db.name);

export default db;
