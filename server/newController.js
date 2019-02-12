const lCtrl = require('./listController')

module.exports ={
  item(req,res){
    // destructure items req.body
    // establish DB connection 
    // save each item to DB
    // Expect each save to return an single item obj array
    // On failure, do nothing
    // On success, push single obj. to array in function
    // return 200 and function array
  } ,
  list(req, res){
    // destructure items, name from req.body
    // destructure id from session.shopper
    // establish DB connection
    // query DB to create new list, passing in name and id as shopper
    // expect an array with single object list with ID key
    // loop through items:
    // query DB for each, adding list_item and passing in list ID and item ID
    // assign req.params.id = the new list id
    // invoke lCtrl.findList, passing in req and res
  }
}