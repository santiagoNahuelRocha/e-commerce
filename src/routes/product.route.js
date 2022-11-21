const { Router } = require("express");
const { conexion } = require("../db");
const fs = require('fs');
const multer  = require('multer')
const path = require('path')
const router = Router();

router.get("/", (req, res) => {
    conexion.query("SELECT * FROM producto", (err, result) => {
        if (err) {
        throw err;
        } else {
        res.render("productos/index", { products: result }); 
        }
    });
});
router.get('/:id/view', (req, res) => {
    const id = req.params.id
    console.log(id)
    conexion.query("SELECT * FROM producto WHERE id = ?", [id], (error, result) => {
        if (error){
            console.log(error)
        }
        else{
            res.render('productos/producto', {producto: result});
        }
    });
})

module.exports = router