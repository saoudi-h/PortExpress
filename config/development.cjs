require('dotenv').config();

module.exports = {
    app: {
        port: 5000,
        host: 'localhost',
    },
    db: {
        host: '127.0.0.1',
        port: '27017',
        name: 'portfolio',
        logLevel: "debug",
        userName: 'app_user',
        userPwd: 'J2=Qeo*TGG:mpOAnE'
    },
    client: {
        url: 'http://localhost:3000'
    },
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        groupId: process.env.TELEGRAM_GROUP_ID
    },
    session:{
        maxMessages:10,
    }
}