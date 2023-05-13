module.exports = {
  env: process.env.NODE_ENV || 'development',
  isProdEnv: process.env.NODE_ENV!=='development',
  session: {
    duration: 24 * 60 * 60 * 1000,
    maxMessages: 3,
  }
}