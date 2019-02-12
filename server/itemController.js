module.exports = {
  findItem(req, res) {
    // establish DB
    // query DB for item by req.params.id
    // on failure return 404 message no item found
    // on success return 200 single obj array
  },
  all(req, res) {
    // establish DB
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
  }
}