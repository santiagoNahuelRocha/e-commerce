const mysql = require('mysql');
const {DB_HOST, DB_NAME, DB_PORT, DB_USER} = require('./config')
const conexion = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    database: DB_NAME
});
conexion.connect(function(err){
    if(err){
        console.log('Error en la conexion', + err.stack);
        return;
    }
    console.log('Hay conexion', + conexion.threadId);
})

module.exports = {conexion} 