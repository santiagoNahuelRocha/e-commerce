const {Router} = require('express');
const { conexion } = require("../db");
const router = Router();
const session = require('express-session')
const bcryptjs = require('bcryptjs')

router.get("/", (req, res) => {
    res.render('index');
});
router.get('/register', (req, res) => {
    res.render('profile/registrarse')
})
router.post('/', (req, res) => {
    const password = req.body.password
    bcryptjs.hash(password, 8, (err, newHash) =>{
        console.log(newHash)
    })   
    // console.log(req.body)
    // const newUser = {
    //     name: req.body.name,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hash
    // }
    // var hash = await bcryptjs.hash(newUser.password, 8)
    // conexion.query('INSERT INTO users set ?', [newUser],(err, result) => {
    //     if(err){
    //         throw err
    //     }else{
    //         res.redirect('profile/')
    //     }
    // })
})
router.post("/auth", (req, res) => {
    console.log(req.body)
    const username= req.body.username
    const password = req.body.password
    if (!username && !password || !username || !password) {
        res.send('Please enter Username and Password')
    }else{
        conexion.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
            if (err) {
                throw err
            }
            if (result.length > 0 ){
                req.session.loggedin = true
                req.session.username = username
                res.redirect('http://localhost:3030/profile')
            }
            else{
                res.send('Incorrect Username and/or Password!');
            }
        })
    }

});

router.get('/profile', (req, res) => {
    res.render('profile/index', {title: 'express', session: req.session} )
    // if(req.session.loggedin){
        
    // }else{

    // }
    // res.render('profile/index')
})

module.exports = router;