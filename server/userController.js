module.exports = {
  findUser(req, res){
    // destructure ID from req.params
    // establish DB
    // query DB by ID
    // On failure, return 404 message "User Not Found"
    // Set shopper.hash = true
    // On success, return 200 shopper array
  } , 
  async getLists(req , res){
    // destructure ID from req.params
    const {id} = req.params
    // establish db
    let db = req.app.get('db')
    // query db for user by id
    let shoppers = await db.query("SELECT * FROM shopper WHERE id = " + id)
    // on failure (empty array), return 404 message "No User Found"
    if(!shoppers.length){return res.status(404).send({message: "No User Found!"})}
    // On success;
    // query DB by ID for lists associate with that user
    let userLists = await db.find_user_lists({id})
    // expect array with all list objects with a user property = id
    // on failure (empty array) return 404 message "No Lists Saved"
    if(!userLists.length){return res.status(404).send({message: "No Lists Saved"})}
    // on success 200 send lists array
    res.status(200).send(userLists)
  }
}