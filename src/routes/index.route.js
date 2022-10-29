const {Router} = require('express');
const { conexion } = require("../db");
const router = Router();

router.get("/", (req, res) => {
    conexion.query("SELECT * FROM producto", (err, result) => {
        if (err) {
        throw err;
        } else {
        res.render("admin/product/list", { producto: result }); 
        }
    });
});

module.exports = router;