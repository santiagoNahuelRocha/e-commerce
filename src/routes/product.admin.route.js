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
        res.render("admin/producto/lista", { productos: result }); 
        }
    });
    
});
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
      
              res.redirect('http://localhost:3030/admin/')
            }
        })
      }
})
router.get('/eliminar/:id', (req, res)=>{ 
  const id = req.params.id;
  conexion.query("DELETE FROM producto WHERE id = ?", [id]);
    res.redirect("http://localhost:3030/admin/");
});
router.get("/editar/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM producto WHERE id = ?", [id], (err, result) => {
      if (err) {
      throw err;
      } else {
      res.render("admin/producto/editar", { producto: result }); 
      }
  });
  
});

router.post('/editar', (req, res)=> { 
  const id = req.body.id
  const actualizarProducto = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    precio: req.body.precio
  }
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const precio = req.body.precio;

  conexion.query("UPDATE producto set ? WHERE id = ? ", [{titulo, descripcion, precio}, id], (err, result) => {
      if (err){
      console.log(err)
      } 
      else{
        res.redirect('http://localhost:3030/admin/')
      }
  })
});
router.get('/editarImagen/:id', (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM producto WHERE id = ?", [id], (err, result) => {
      if (err) {
      throw err;
      } else {
      res.render("admin/producto/editarImagen", { producto: result }); 
      }
  });
})
router.post('/editarImagen', upload.single('nuevaImagen'), (req, res) => {
  console.log(req.file)
  console.log('aaaaaaaaaaa')
  // console.log(req.file)
  // const imagen = req.file.filename;
  // const tipo = req.file.mimetype;
  // const titulo = req.body.titulo;
  // const descripcion = req.body.descripcion;
  // const precio = req.body.precio;
  // if (!req.file) {
  //     console.log("No file upload");
  //   } else {
  //     console.log(req.file)
    
  //     var insertData = "INSERT INTO producto set ?"
  //     conexion.query("INSERT INTO producto set ?", [{titulo, descripcion, precio, imagen, tipo}], (err, result) => {
  //         if (err){
  //         console.log("file uploaded")
  //         console.log(err)
  //         } 
  //         else{
  //           console.log(imagen)
    
  //           res.redirect('http://localhost:3030/admin/')
  //         }
  //     })
  //   }
})

module.exports = router;