require('dotenv').config();

module.exports = {
    app: {
        port: 5000,
        host: 'localhost',
        secure: false,
    },
    db: {
        connectionString: 'mongodb://app_user:J2%3DQeo*TGG%3AmpOAnE@127.0.0.1:27017/portfolio',
        host: '127.0.0.1',
        port: '27017',
        scheme: 'mongodb',
        name: 'portfolio',
        logLevel: "debug",
        userName: 'app_user',
        userPwd: 'J2=Qeo*TGG:mpOAnE'
    },
    client: {
        url: 'http://localhost:3000'
    },
    telegram: {
        token: '6003675893:AAFgtq0aMc9cyiU64GG945H51JKbVciDVhU',
        groupId: process.env.TELEGRAM_GROUP_ID
    },
    session: {
        secret:process.env.SESSION_SECRET,
        maxMessages: 10
    }
}