const { Router } = require("express");
const { conexion } = require("../db");
const session = require('express-session')

const router = Router();

router.get("/", (req, res) => {
    conexion.query("SELECT * FROM products", (err, result) => {
        if (err) {
        throw err;
        } else {
        res.render("productos/index", { products: result, user : req.session.username }); 
        }
    });
});
router.get('/:id/view', (req, res) => {
    const id = req.params.id
    console.log(id)
    conexion.query("SELECT * FROM products WHERE id = ?", [id], (error, result) => {
        if (error){
            console.log(error)
        }
        else{
            res.render('productos/producto', {producto: result, user : req.session.username});
        }
    });
})
router.get('/nuevosProductos', (req, res) => {
    conexion.query('SELECT * FROM products Order by (createdAt) DESC LIMIT 10;', (error, result) => {
        if(error){
            console.log(error)
        }else{
            res.render('productos/nuevosProductos', {nuevoProducto: result, user : req.session.username})
        }
    })
})

module.exports = router