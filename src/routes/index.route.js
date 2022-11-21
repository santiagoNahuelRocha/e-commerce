const {Router} = require('express');
const { conexion } = require("../db");
const router = Router();

router.get("/", (req, res) => {
    res.render('index');
});
router.get("/example", (req, res) => {
    res.render('admin/product/example');
});

module.exports = router;