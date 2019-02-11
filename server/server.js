require('dotenv').config();
const express =require('express');
const massive =require('massive');
const session =require('express-session');

const { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;

const app=express();
app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))



massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, ()=>{console.log(`Battle Cruiser Operational On Port ${SERVER_PORT}`)})
})