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
  }
}