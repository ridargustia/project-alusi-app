const dotenv = require('dotenv');
const envFound = dotenv.config();

const config = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    token_secret: process.env.TOKEN_SECRET
};

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = { config };