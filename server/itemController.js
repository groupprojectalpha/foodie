const testCtrl = require('./testController')

module.exports = {
  findItem(req, res) {
    // establish DB
    // query DB for item by req.params.id
    // on failure return 404 message no item found
    // on success return 200 single obj array
  },
  all(req, res) {
    let db = req.app.get('db')
    // qurey DB for items
    // expect response array 20 obj sorted by rank
    // on failure send message 404 unable to load items
    // on success return 200 and obj array
  },
  foodieIncPrice(req, res) {
    // destructure item id and store id off req.params
     // establish DB connection
     // qurey DB for item code and store code
     // expect array with single obj with item code and store code
     // make api call
     // on failure retry call
     // on success parse data into object with a key of price in pennies
     // return 200 and obj in array
  } , 
  async newItems(req, res){
    const { store , term } = req.params
    let db = req.app.get('db')
    // Search DB for items matching term that ARE NOT on any of the shopper's lists
    let searchTerm = "%" + term + "%"
    let { id } = req.session.shopper
    let dbItems = await db.new_items({searchTerm , id , store})
    // Determine which store they're searching by, and pass the search off the the appropriate API controller
    let apiItems = null;
    switch(+store){
      case 1:
        apiItems = [{message: "It's foodie inc!"}]
        break;
      case 2:
        apiItems = await testCtrl.testWalmart()
        break;
      default:
        apiItems = []
    }
    // Expect back an array of objects matching the DB objects, but with the additional key 'store'
    // Merge the two arrays
    let finalReturn = [...dbItems, ...apiItems]
    // Return the new array of items
    res.status(200).send(finalReturn)
  }
}