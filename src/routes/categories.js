const {Router} = require('express')
const router = Router()
const {conexion} = require('../db')

router.post('/', (req, res) => {
        const newCategory = {
        name: req.body.category,
        description: req.body.description
    }
    console.log(newCategory)
    var inserData = 'INSERT INTO categories set ?'
    conexion.query(inserData, [newCategory], (err, result) => {
        if (err) {
            console.log("ERROR TO CREATE A CATEGORY");
            // console.log(err);
        }else{
            console.log('QUERY OK')
            res.redirect("http://localhost:3030/admin/");
        }
    })
})
module.exports = router
