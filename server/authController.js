let bcrypt = require('bcryptjs')

module.exports = {
  async login(req, res){
    let db = req.app.get('db')
    let user = await db.check_email(req.body)
    // console.log(user[0])
    if(user.length === 0){return res.status(401).send({message: "Incorrect Email or Password!"})}
    let isCorrect = bcrypt.compareSync(req.body.password , user[0].hash)
    if(!isCorrect){return res.status(401).send({message: "Incorrect Email or Password!"})}
    user[0].hash = true
    req.session.shopper=user[0]
    res.status(200).send([req.session.shopper])
  } , 
  async register(req, res){
    // Should take in req.body with name, email, password, state, phone properties
    let { name , email , password , state , phone } = req.body
    // Should establish DB
    let db = req.app.get('db')
    // Needs to check against DB to ensure email doesn't exist
    try {
      let emailExists = await db.check_email({email: email})
      // on failure, return and send message to client that email is in use
      if(emailExists[0]){return res.status(400).send({message: "Email is in Use!"})}
    } catch (error) {
      return res.status(500).send(error)
    }
    // On Success, hash and salt password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password , salt)
    req.body.hash = hash
    // Save all of the above info to DB
    try {
      var newShopper = await db.create_shopper(req.body)
    } catch (error) {
      return res.status(500).send(error)
    }
    // Put shopper on session
    req.session.shopper = newShopper[0]
    // Set user.hash to true
    req.session.shopper.hash = true
    // Send shopper array back to client
    res.status(200).send([req.session.shopper])
  } , 
  check(req,res){
    // check session.shopper is true
    // on failure, return 404 message obj w/ message "No Shopper On Session"
    // on success, return 200 [session.shopper]
  } ,
  logout(req,res){
    // destroy session
    // redirect to loginoptions
  }
}