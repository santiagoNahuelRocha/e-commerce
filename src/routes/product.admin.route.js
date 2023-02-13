const { Router } = require("express");
const { conexion } = require("../db");
const multer = require("multer");
const path = require("path");
const router = Router()

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/imagen"),
  // destination: "images",
  // filename: (req, file, cb) => {
  //   cb(null, file.originalname);
  // },
});
const upload = multer({ storage: storage }).single('image');

/* MOSTRAR TODOS LOS PRODUCTOS */
router.get("/", (req, res) => {
  var insertData = "SELECT * FROM products JOIN categories WHERE products.id_category = categories.id_category";
  conexion.query(insertData, (err, resultProduct) => {
    if (err) {
      throw err;
    } else {
      conexion.query("SELECT * FROM categories", (err, resultCategories) => {
        if (err) {
          throw err
        }
        else{
          res.render("admin/producto/lista", { products: resultProduct, categories: resultCategories });
        }
      })
    }
  });
});

/*CREAR PRODUCTO */
router.post("/", upload, (req, res) => {

  console.log(req.body.categories)
  const newProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    id_category: req.body.categories,
    stock: req.body.stock,
    image: req.file.filename,
    type: req.file.mimetype,
  };
  if (!newProduct.title, !newProduct.description, !newProduct.price) {
    console.log("No body upload");
  } else {
    var insertData = "INSERT INTO products set ?";
    conexion.query(insertData, [newProduct], (err, result) => {
      if (err) {
        console.log("file uploaded");
        console.log(err);
      } else {
        res.redirect("http://localhost:3030/admin/");
      }
    });
  }
});

/*MOSTRAR VISTA DE EDITAR UN PRODUCTO*/ 
router.get("/editar/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render("admin/producto/editar", { producto: result });
    }
  });
});
/*EDITAR PRODUCTO*/
router.post("/editar", upload, (req, res) => {
  console.log(req.file)
  const id = req.body.id;
  const updateProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.file.filename,
    type: req.file.mimetype
  };
  console.log(updateProduct)

  conexion.query(
    "UPDATE products set ? WHERE id = ? ",
    [updateProduct, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("http://localhost:3030/admin/");
      }
    }
  );
});

/*ELIMINAR PRODUCTO*/ 
router.get("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM products WHERE id = ?", [id]);
  res.redirect("http://localhost:3030/admin/");
});


module.exports = router;
