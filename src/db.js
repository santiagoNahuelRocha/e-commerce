const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'ecommerce'
});
conexion.connect(function(err){
    if(err){
        console.log('Error en la conexion', + err.stack);
        return;
    }
    console.log('Hay conexion', + conexion.threadId);
})

module.exports = {conexion} 