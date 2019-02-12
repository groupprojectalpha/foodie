module.exports = {
  findUser(req, res){
    // destructure ID from req.params
    // establish DB
    // query DB by ID
    // On failure, return 404 message "User Not Found"
    // Set shopper.hash = true
    // On success, return 200 shopper array
  } , 
  getLists(req , res){
    // destructure ID from req.params
    // establish db
    // query db for user by id
    // on failure (empty array), return 404 message "No User Found"
    // On success;
    // query DB by ID for lists associate with that user
    // expect array with all list objects with a user property = id
    // on failure (empty array) return 404 message "No Lists Saved"
    // on success 200 send lists array
  }
}