import { MongoClient } from "mongodb";
import config from "config";

const connectionString = `mongodb://${config.db.userName}:${encodeURIComponent(
  config.db.userPwd
)}@${config.db.host}:${config.db.port}/${config.db.name}`;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db(config.db.name);

export default db;
