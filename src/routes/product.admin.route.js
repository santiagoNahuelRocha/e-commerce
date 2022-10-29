const { Router } = require("express");
const { conexion } = require("../db");
const multer  = require('multer')
const path = require('path')
const router = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/imagen'),
});
const upload = multer({storage: storage})
  
//completado
router.get("/", (req, res) => {
    conexion.query("SELECT * FROM producto", (err, result) => {
        if (err) {
        throw err;
        } else {
        res.render("admin/product/list", { producto: result }); 
        }
    });
});
//completado
router.get('/agregar', (req, res) => {
    res.render('admin/product/add');
})
//completado
router.post('/subir', upload.single('imagen'), (req, res) => {
    
    console.log(req.file)
    const imagen = req.file.filename;
    const tipo = req.file.mimetype;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    if (!req.file) {
        console.log("No file upload");
      } else {
        console.log(req.file)
      
        var insertData = "INSERT INTO producto set ?"
        conexion.query("INSERT INTO producto set ?", [{titulo, descripcion, precio, imagen, tipo}], (err, result) => {
            if (err){
            console.log("file uploaded")
            console.log(err)
            } 
            else{
              console.log(imagen)
      
              res.redirect('http://localhost:3030/admin')
            }
        })
      }
})

module.exports = router;