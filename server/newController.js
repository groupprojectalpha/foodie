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
  async list(req, res){
    // destructure items, name from req.body
    // destructure id from session.shopper
    // establish DB connection
    // query DB to create new list, passing in name and id as shopper
    // expect an array with single object list with ID key
    // loop through items:
    // query DB for each, adding list_item and passing in list ID and item ID
    // assign req.params.id = the new list id
    // invoke lCtrl.findList, passing in req and res

    let { items , name } = req.body
    let { id: userId } = req.session.shopper
    let db = req.app.get('db')
    let createdList = await db.create_list({name , userId}).catch((error) => res.status(500).send(error))
    if(!createdList[0]){return res.status(500).send({message: "Unable to Create List!"})}
    req.params.id = createdList[0].id
    let promises = items.map(async (item) => {
      let itemAdded = db.add_list_item({item: item.id , list: createdList[0].id}).catch(error => res.status(500).send(error))
      return itemAdded
    })
    Promise.all(promises).then(() => {
      lCtrl.findList(req, res)
    })
    .catch(err => console.log(err))
  } ,
  async store(req, res){
    const {nickname , chain , storeId} = req.body
    const {id: userId} = req.session.shopper
    // console.log(`nickname is ${nickname} , chain is ${chain} , store_id is ${storeId} , userId is ${userId}`)
    const db = req.app.get('db')
    // THIS SECTION CHECKS TO SEE IF THE STORE EXISTS ON DB. IF NOT, IT ADDS IT //
    let storeExists = await db.check_store_exists({storeId: `${storeId}`})
    if(!storeExists.length){
      let newStores = await db.create_store({storeId: '' + storeId , chain}).catch(err => res.status(500).send("DB Error:" + err))
      storeExists.push(...newStores)
    } else {
    // THIS SECTION CHECKS TO BE SURE THE STORE ISN'T ALREADY ASSOCIATED WITH THE USER //
    let userStores = await db.get_user_stores({userId}).catch(err => res.status(500).send("DB Error:" + err))
    let alreadyThere = userStores.findIndex(store => store.store === storeExists[0].id || store.nickname === nickname)
    if(alreadyThere !== -1){return res.status(409).send({message: "Store Already Saved! Nickname or StoreId already in use."})}
    }
    // THIS SECTION ASSOCIATES THE STORE WITH THE USER //
    let userStores = await db.add_user_store({storeId: storeExists[0].id , userId , nickname}).catch(err => res.status(500).send(err))
    let wasCreated = userStores.findIndex((store) => store.nickname === nickname)
    if(wasCreated === -1){return res.status(500).send("Unable to Create Store! Check New Controller.")}
    // THIS SECTION RETURNS ALL OF THE USER'S STORES, INCLUDING THE ADDED ONE //
    res.status(200).send(userStores)
  }
}