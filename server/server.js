require('dotenv').config();
const express =require('express');
const massive =require('massive');
const session =require('express-session');
const aCtrl = require('./authController')

const { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;

const app=express();
app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

// TESTING ENDPOINTS //
app.get('/test' , (req , res) => {
    let db = app.get('db')
    db.query("select * from shopper")
    .then((reply) => res.status(200).send(reply))
    .catch((error) => res.status(400).send(error))
})

// AUTHORIZATION ENDPOINTS //
app.post('/auth/login' , aCtrl.login)  // OPERATIONAL //



massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, ()=>{console.log(`Battle Cruiser Operational On Port ${SERVER_PORT}`)})
})