const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {conexion} =require('./db')
const { Console } = require('console');
//iniciar
app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('nombre', 'ecommerce')
app.set('puerto', process.env.PORT || 3030 ) 

//configuracion
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//midlewares
app.use(morgan('dev'));

//rutas
app.use('/', require('./routes/index.route'));
app.use('/admin', require('./routes/product.admin.route'));
app.use('/productos', require('./routes/product.route'));

//public
app.use('/public', express.static(path.join(__dirname, 'public')));

//empezar
app.listen(app.get('puerto'), () =>{
    console.log('El servidor de', app.get('nombre'), 'esta en el puerto', app.get('puerto'));
})