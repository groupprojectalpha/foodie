require('dotenv').config();
const express =require('express');
const massive =require('massive');
const session =require('express-session');
const aCtrl = require('./authController')
const uCtrl = require('./userController')
const lCtrl = require('./listController')
const iCtrl = require('./itemController')
const nCtrl = require('./newController')

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
app.post('/auth/register' , aCtrl.register) // IN PROGRESS //
app.get('/auth/check' , aCtrl.check) // IN PROGRESS //
app.delete('/auth/logout' , aCtrl.logout) // IN PROGRESS //

// USER DATA ENDPOINTS //
app.get('/user/:id/lists' , uCtrl.getLists) // IN PROGRESS //
app.get('/user/:id' , uCtrl.findUser) // IN PROGRESS //

// ITEM DATA ENDPOINTS //
app.get('/item/:id' , iCtrl.findItem) // IN PROGRESS //
app.get('/item/all', iCtrl.all) //IN PROGRESS //
app.get('/item/:id/:storeId', iCtrl.foodieIncPrice) //IN PROGRESS //

// LIST DATA ENDPOINTS //
app.get('/list/:id', lCtrl.findList) //IN PROGRESS //
app.delete('/list/:id', lCtrl.delete) //IN PROGRESS //

// NEW DB OBJECT ENDPOINTS //
app.post('/new/item', nCtrl.item) // IN PROGRESS // 
app.post('/new/list' , nCtrl.list) // IN PROGRESS //


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, ()=>{console.log(`Battle Cruiser Operational On Port ${SERVER_PORT}`)})
})