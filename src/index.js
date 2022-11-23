const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {conexion} = require('./db')
const session = require('express-session')

const client = require('./routes/index.route');
const admin = require('./routes/product.admin.route');
const products = require('./routes/product.route')
const categories = require('./routes/categories');
//iniciar
app = express();
app.use(session({
    secret:'ecommerce',
    resave: true,
    saveUninitialized: true
}))
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
app.use('/', client);
app.use('/admin', admin);
app.use('/productos', products);
app.use('/admin/category', categories)

//public
app.use('/public', express.static(path.join(__dirname, 'public')));

//empezar
app.listen(app.get('puerto'), () =>{
    console.log('El servidor de', app.get('nombre'), 'esta en el puerto', 'http://localhost:'+app.get('puerto'));
})