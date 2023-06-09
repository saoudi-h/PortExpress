require('dotenv').config();

module.exports = {
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    secure: true,
  },
  db: {
    connectionString: process.env.DB_CONNEXION_STRING,
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    scheme: process.env.DB_STRING_SCHEME,
    name: 'portfolio',
    logLevel: 'debug',
    userName: process.env.DB_USER_NAME,
    userPwd: process.env.DB_USER_PWD
  },
  client: {
    url: process.env.CLIENT_AUTH_DOMAIN,
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    groupId: process.env.TELEGRAM_GROUP_ID
  },
  session: {
    secret:process.env.SESSION_SECRET,
    maxMessages: 10
}
}