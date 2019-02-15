const testCtrl = require('./testController')
const pCtrl = require('./apiController')

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
    
    // BAD CODE //
    // Search DB for items matching term that ARE NOT on any of the shopper's lists
    // let searchTerm = "%" + term + "%"
    // let { id } = req.session.shopper
    // let dbItems = await db.new_items({searchTerm , id , store})


    // Determine which store they're searching by, and pass the search off the the appropriate API controller
    let apiItems = null;
    switch(+store){
      case 1:
        apiItems = [{message: "It's foodie inc!"}]
        break;
      case 2:
        apiItems = await pCtrl.searchWalMart(store, term, req)
        break;
      default:
        apiItems = []
    }
    // Expect back an array of objects matching the DB objects, but with the additional key 'store'
    // Compare the array with our DB
    let comparedItems = apiItems.map(async (item , i) => {
      let retArr = await db.query(`SELECT * FROM item WHERE itemcode = '${+item.code}'`)
      if(retArr[0]){return retArr[0]}
      else if(!retArr[0]){return item}
      else {return;}
    })
    // Return the new array of items
    res.status(200).send(await Promise.all(comparedItems))
  } ,
  async addItems(req, res){
    let db = req.app.get('db')
    let {items} = req.body
    // THIS SECTION SORTS NEW ITEMS INTO A NEW ARRAY SO THEY CAN BE ADDED TO THE DB //
    let toAdd = []
    let existing = []
    items.forEach(item => {
      if(item.store){
        toAdd.push(item)
      } else {
        existing.push(item)
      }
    });

    // THIS SECTION INSERTS NEW ITEMS INTO DB, AND RETURNS AN ARRAY OF DB ITEMS //
    let processedItems = await Promise.all(toAdd.map( async (item) => {
      let insertedItemArr = await db.query(`INSERT INTO item (name, type, brand, itemcode, price, image) VALUES ('${item.name}', '${item.type}', ${item.brand}, '${item.code}', ${item.price * 100}, '${item.image}') RETURNING *`)
      .catch((err) => console.log(err))
      db.query(`INSERT INTO store_item (store , item) VALUES (${item.store} , ${insertedItemArr[0].id})`)
      return insertedItemArr[0]
    }))

    // THIS SECTION RE-COMBINES THE TWO ARRAYS //
    let all = [...existing , ...processedItems]

    // THIS SECTION CHECKS TO SEE IF THE LIST EXISTS //
    if(!req.body.name){req.body.name = "Favorite Items"}
    let listIdArr = await db.query(`SELECT id FROM list WHERE name = '${req.body.name}'`)
    let listId = null;
    if(!listIdArr[0]){
      // THIS SECTION CREATES A LIST IF A LIST IS NOT FOUND //
      let newListArr = await db.create_list({name: req.body.name , userId: req.session.shopper.id})
      listId = newListArr[0].id
    } else {
      listId = listIdArr[0]
    }

    // THIS SECTION ADDS ALL ITEMS TO LIST_ITEM //
    all.forEach(async (item) => {
      await db.add_list_item({item: item.id , list: listId})
    })

    // AT THIS POINT, ALL ITEMS SHOULD HAVE BEEN ADDED TO THE DB AND ASSIGNED TO A LIST. NOW THEY ARE RETURNED TO THE CLIENT //

  res.status(200).send(all)
  } ,
}