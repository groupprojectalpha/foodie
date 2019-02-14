module.exports = async function (req, res, next){
  if (req.session.shopper){
    next()
  } else {
    let db = req.app.get('db')
    let userArr = await db.check_email({email: "teddy@test.com"}).catch((err) =>{
      res.sendStatus(500)
      throw "devPassthrough: DB responded with error" + err;
    })
    if(!userArr.length){
      res.status(500).send({message: "devPassthrough cannot find user, aborting request"})
      throw "devPassthrough: Cannot Find User!";
    }
    req.session.shopper = userArr[0]
    req.session.shopper.hash = true
    console.log("Teddy Test logged in!")
    next()
  }
}