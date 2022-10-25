const {Router} = require('express');
const { conexion } = require("../db");
const router = Router();

router.get('/', ( req, res) =>{
    res.render('index')
})

module.exports = router;