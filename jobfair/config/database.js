const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
    uri: 'mongodb://localhost:27017/jobfair', //+ this.db, //process.env.databaseUri, // Databse URI and database name
    secret: crypto, // Cryto-created secret
    db: 'jobfair'//process.env.databaseName // Database name
}