require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const aCtrl = require('./authController')
const uCtrl = require('./userController')
const lCtrl = require('./listController')
const iCtrl = require('./itemController')
const nCtrl = require('./newController')
const pCtrl = require('./apiController')
const testCtrl = require('./testController')
const passThrough = require('./middlewares/devPassthrough')
const twilio = require('twilio')

const { SERVER_PORT, CONNECTION_STRING, SECRET, AUTHTOKEN, SID, PHONENUMBER } = process.env;
const accountSid = SID;
const authToken = AUTHTOKEN;
const client = new twilio(accountSid, authToken)



const app = express();
app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passThrough)

app.use(express.static(`${__dirname}/../build`))




app.get('/text/:recipient', async (req, res) => {
    const db = req.app.get('db');
    let listId = await db.query('select id from list where shopper = ' + req.session.shopper.id + "and name = 'clearabledefault' ").catch((error) => { console.log(error) })
    if (listId.length === 0) {
        listId = await db.create_list({
            name: 'clearabledefault',
            userId: req.session.shopper.id
        })

    }
    console.log(listId[0].id, 'is list id')
    const { recipient } = req.params
    console.log(recipient)
    client.messages.create({
        to: recipient,
        from: PHONENUMBER,
        body: 'http://localhost:3001/#/mobile/' + listId[0].id,
    })
        .then(message => console.log(message.sid)).catch((error) => { console.log(error) })
}
)


// TESTING ENDPOINTS //
app.get('/test/:store/:id' , iCtrl.callItems)

// API ENDPOINTS //
app.get('/api/:zip' , pCtrl.getStores)

// AUTHORIZATION ENDPOINTS //
app.post('/auth/login', aCtrl.login)
app.post('/auth/register', aCtrl.register)
app.get('/auth/check', aCtrl.check)
app.delete('/auth/logout', aCtrl.logout)

// USER DATA ENDPOINTS //
app.get('/user/lists' , uCtrl.getLists)
// app.get('/user/stores' , uCtrl.getStores) // IN PROGRESS //
app.get('/user/:id' , uCtrl.findUser) // IN PROGRESS //

// ITEM DATA ENDPOINTS //
app.get('/item/all', iCtrl.all) //IN PROGRESS //
app.put('/item/additems', iCtrl.addItems)
app.get('/item/:id', iCtrl.findItem) // IN PROGRESS //
app.get('/item/:id/:storeId', iCtrl.foodieIncPrice) //IN PROGRESS //
app.get('/search/:chain/:store/:term', iCtrl.newItemsAgain)
// app.get('/search/:store/:term', iCtrl.newItems) // DEPRECIATED ... DO NOT USE //

// LIST DATA ENDPOINTS //
app.put('/list/rank/:id', lCtrl.rank)
app.delete('/list/clear', lCtrl.clear)
app.get('/list/:id', lCtrl.findList)
app.get('/list/:id/items', lCtrl.items)
app.delete('/list/:id', lCtrl.delete) //IN PROGRESS //

// NEW DB OBJECT ENDPOINTS //
app.post('/new/item', nCtrl.item) // IN PROGRESS // 
app.post('/new/list' , nCtrl.list)
app.post('/new/store' , nCtrl.store)


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => { console.log(`Battle Cruiser Operational On Port ${SERVER_PORT}`) })
})

// FIREBASE ENDPOINT //
app.post('/auth/firebase', aCtrl.fireBase)