const DB = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_NAME: process.env.DB_NAME || 'ecommerce',
    DB_PORT: process.env.DB_PORT || 3306
}

module.exports = DB