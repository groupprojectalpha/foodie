let bcrypt = require('bcryptjs')
let lCtrl = require('./listController')

module.exports = {

  async login(req, res){
    const {email, password} = req.body
    let db = req.app.get('db')
    let userArray = await db.check_email({email: email})
    if(!userArray[0]) {
      return res.status(200).send({ message: 'Email not found.' });
    } else {
      const pass = bcrypt.compareSync(password, userArray[0].hash)
      if (pass) {
        userArray[0].hash=true;
        req.session.shopper=userArray[0]
         return res.status(200).send({ message: 'logged in', user: req.session.shopper })
      } else { return res.status(200).send({ message: 'Password does not match Username' }); }
    }
  } , 

  async register(req, res){
    // Should take in req.body with name, email, password, state, phone properties
    let { name , email , password , state , phone } = req.body
    // Should establish DB
    let db = req.app.get('db')
    // Needs to check against DB to ensure email doesn't exist
    let emailExists = await db.check_email({email: email}).catch(err => {
      console.log(err)
      return res.status(500).send(err)
    })
    
    // on failure, return and send message to client that email is in use
    if(emailExists[0]){return res.status(400).send({message: "Email is in Use!"})}
    // On Success, hash and salt password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password , salt)
    req.body.hash = hash
    // Save all of the above info to DB
    try {
      var newShopper = await db.create_shopper(req.body)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
    // Create a default "Favorite Items" list for the new shopper
    let defaults = await db.create_list({name: "Favorite Items" , userId: newShopper[0].id})
    // Insert the default_list property into the newShopper
    let defaultAdded = await db.query(`UPDATE shopper SET default_list = ${defaults[0].id} WHERE id = ${newShopper[0].id} RETURNING *`)
    // Put shopper on session
    req.session.shopper = defaultAdded[0]
    // Set user.hash to true
    req.session.shopper.hash = true
    // Send shopper array back to client
    res.status(200).send([req.session.shopper])


  } , 
  check(req,res){
    // check session.shopper is true
    // on failure, return 404 message obj w/ message "No Shopper On Session"
    // on success, return 200 [session.shopper]
    if(req.session.shopper){res.status(200).send([req.session.shopper])}
    else {
      res.status(401).send({message: "No Shopper On Session"})
    }
  } ,
  logout(req,res){
    // destroy session
    // redirect to loginoptions
    req.session.destroy(()=>{
      res.sendStatus(201)
    })
  },

  async fireBase(req,res){
    const { uid, displayName, photoURL, email, providerId } = req.body
    console.log( 'top', req.body)
    let db = req.app.get('db')
    let userArr = await db.query(`SELECT * FROM shopper WHERE uid = '${uid}'`)
    console.log('mid', userArr)
    let id;
    if(!userArr.length){
      let regArr = await db.query(`INSERT INTO shopper (uid) VALUES ('${uid}') RETURNING *`)
      console.log('bottom', regArr[0])
      let listArr = await db.create_list({name: 'Favorite Items', userId: id})
      let default_list = listArr[0].id
      req.session.shopper = regArr[0]
      return res.status(200).send({ message: 'shopper exists'})
    } else {
      console.log('very bottom', userArr[0])
      id = userArr[0].id
      req.session.shopper = { uid: uid, displayName: displayName, photoURL: photoURL, email: email, providerId: providerId }
      console.log(req.session.shopper)
      return res.status(200).send({ message: 'logged in' });
    }
    
  }
}