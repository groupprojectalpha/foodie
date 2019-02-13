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
    // let listItems = []
    // items.forEach((item) => {
    //   let itemAdded = db.add_list_item({item: item.id , list: createdList[0].id})
    //   .catch(error => res.status(500).send(error))
    //   .then(() => {
    //   console.log(itemAdded)
    //   listItems.push(itemAdded)
    //   })
    // });
    let itemsAdded = []
    let promises = items.map(async (item) => {
      let itemAdded = db.add_list_item({item: item.id , list: createdList[0].id}).catch(error => res.status(500).send(error))
      let resolved = await itemAdded
      itemsAdded.push(resolved[0])
      return itemAdded
    })


    // FOR TESTING //

    // PROMISE.ALL RETURNS PROMISES. I"M AT A LOSS //
    Promise.all(promises).then(() => {
      res.status(200).send(itemsAdded)
      // console.log("HIT" , itemsAdded)
    })
    .catch(err => console.log(err))
  }
}