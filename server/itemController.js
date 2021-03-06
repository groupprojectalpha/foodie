const testCtrl = require('./testController')
const pCtrl = require('./apiController')
const parser = require('./lib/apostropheParser')

module.exports = {
  findItem(req, res) {
    // establish DB
    // query DB for item by req.params.id
    // on failure return 404 message no item found
    // on success return 200 single obj array
  },
  async all(req, res) {
    const { id } = req.session.shopper
    let db = req.app.get('db')
    let response = await db.item_all({id}).catch((error)=>{console.log(error)})
    res.status(200).send(response)
    // expect response array 20 obj sorted by rank
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

    // DETERMINE THE CHAIN OF THE STORE //
    let chains = await db.get_store_chain({storeId: +store}).catch(err => res.status(500).send("DB Error: " + err))
    if(!chains.length)(res.status(404).send("Chain not found! Check DB to see that store is properly assigned."))

    // Determine which store they're searching by, and pass the search off the the appropriate API controller
    let apiItems = null;
    switch(chains[0].chain){
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
      let retArr = await db.query(`SELECT * FROM item WHERE itemcode = '${+item.itemcode}'`)
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
    let codeObjs = await db.query("SELECT itemcode FROM item")
    let codes = codeObjs.map(obj => obj.itemcode)
    // console.log(codes)
    
    let toAdd = []
    let existing = []

    items.forEach(item => {
      if(codes.includes(item.itemcode)){
        existing.push(item)
      } else {
        toAdd.push(item)
      }
    });

    // THIS SECTION INSERTS NEW ITEMS INTO DB, AND RETURNS AN ARRAY OF DB ITEMS //
    let processedItems = await Promise.all(toAdd.map( async (item) => {
      let insertedItemArr = await db.query(`INSERT INTO item (name, type, brand, itemcode, price , image , chain) VALUES ('${parser(item.name)}', null, null, '${item.itemcode}', ${item.price * 100} , '${item.image}' , ${item.chain}) RETURNING *`)
      .catch((err) => console.log("addItems: DB Error: " + err))
      // console.log(insertedItemArr[0])
      // vvv MOST LIKELY DEPRECIATED vvv //
      // db.query(`INSERT INTO store_item (store , item) VALUES (${item.store} , ${insertedItemArr[0].id})`)
      // ^^^ //
      return insertedItemArr[0]
    }))

    let merged = await Promise.all(existing.map(async (item) => {
      let dbItems = await db.query("SELECT * FROM item WHERE itemcode = " + `'${item.itemcode}'`)
      // console.log("DBItems:" , dbItems)
      return {...dbItems[0] , ...item}
    }))
    // THIS SECTION RE-COMBINES THE TWO ARRAYS //
    let all = [...merged , ...processedItems]
    // console.log("All:" , all)

    // THIS SECTION CHECKS TO SEE IF THE LIST EXISTS //
    if(!req.body.name){req.body.name = "Favorite Items"}
    let listIdArr = await db.query(`SELECT id FROM list WHERE name = '${parser(req.body.name)}' AND shopper = ${req.session.shopper.id}`)
    let listId = null;
    if(!listIdArr[0]){
      // THIS SECTION CREATES A LIST IF A LIST IS NOT FOUND //
      let newListArr = await db.create_list({name: req.body.name , userId: req.session.shopper.id})
      listId = newListArr[0].id
    } else {
      listId = listIdArr[0].id
    }

    
    // THIS SECTION ADDS ALL ITEMS TO LIST_ITEM //
    all.forEach(async (item) => {
      // console.log("ListId: " , listId , "ItemId: " , item.id)
      await db.add_list_item({item: item.id , list: listId})
    })

    // AT THIS POINT, ALL ITEMS SHOULD HAVE BEEN ADDED TO THE DB AND ASSIGNED TO A LIST. NOW THEY ARE RETURNED TO THE CLIENT //

  res.status(200).send(all)
  } ,

  // ================================================== END ================================================//

  async newItemsAgain(req, res){
    const { chain , store , term } = req.params

    // Determine which store they're searching by, and pass the search off the the appropriate API controller
    let apiItems = null;
    switch(+chain){
      case 1:
        apiItems = [{message: "It's foodie inc!"}]
        break;
      case 2:
        apiItems = await pCtrl.searchWalMart(store, term)
        break;
      default:
        apiItems = []
    }
    // Expect back an array of objects matching the DB objects, but with the additional key 'store'
    // // Compare the array with our DB
    // let comparedItems = apiItems.map(async (item , i) => {
    //   let retArr = await db.query(`SELECT * FROM item WHERE itemcode = '${+item.itemcode}'`)
    //   if(retArr[0]){return retArr[0]}
    //   else if(!retArr[0]){return item}
    //   else {return;}
    // })
    // Return the new array of items
    res.status(200).send(await Promise.all(apiItems))
  } ,
  async callItems(req, res){
    // CALL DB FOR ITEMS //
    const db = req.app.get('db')
    let items = await db.load_list({list: req.params.id , limit: null})
    // USE GETWALMARTITEM TO GET EACH ITEM //
    let calledItems = [];
    for(let i = 0 ; i < items.length ; i++){
      let item = items[i]
      switch(item.chain){
        case 2:
          let info = await pCtrl.getWalmartItem(+req.params.store , +item.itemcode)
          calledItems.push({...item , ...info})
          break;
        default:
          console.log("callItems: Unable to determine chain on item " + item.id)
      }
    }
    // RETURN ARRAY OF ITEMS //
    res.status(200).send(calledItems)
  }
}