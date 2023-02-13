const {Router} = require('express');
const { conexion } = require("../db");
const router = Router();
const session = require('express-session')
const bcryptjs = require('bcryptjs')

router.get("/", (req, res) => {
    res.render('index', {user : req.session.username});
});


router.get('/register', (req, res) => {
    res.render('profile/registrarse', {user : req.session.username})
})
router.post('/', (req, res) => {
    const password = req.body.password
    hash = bcryptjs.hash(password, 10, (err, newHash) =>{
        const newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: newHash
    }
        console.log(newUser)
        conexion.query('INSERT INTO users set ?', [newUser],(err, result) => {
            if(err){
                throw err
            }else{
                req.session.loggedin = true
                req.session.username = newUser.username
                res.render('profile/index', {user: req.session.username})
            }
        })
    })
})

router.get('/login', (req, res) => {
    res.render('profile/login', {user : req.session.username})
})
router.post("/auth", (req, res) => {
    const data = req.body

    var query = 'SELECT * FROM users WHERE username = ?';
    conexion.query(query, [data.username], (err, userData) => {
        if(userData.length > 0 ){
            console.log("si")
            userData.forEach(element => {
                bcryptjs.compare(data.password, element.password, (err, isMatch) => {
                    if(!isMatch){
                        console.log("errorrrr")
                    }
                    else{
                        req.session.loggedin = true
                        req.session.username = element.username
                        res.render("profile/index", {user: req.session.username})
                    }
                })
            });
        }else{

        }


    })
});

router.get('/profile', (req, res) => {
        res.render('profile/',  {user : req.session.username})
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:3030/')
})

module.exports = router;