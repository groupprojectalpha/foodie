module.exports ={
  async findList(req,res){
    console.log("ID is" , req.params.id)
    // destructure list id req.params
    let {id} = req.params
    // establish DB connection
    let db = req.app.get('db')
    // qurey for limit?
    // if limit qurey DB with limit
    let limit = null;
    if(req.query.limit){limit = req.query.limit}
    // if not qurey Db by id
    let listItems = await db.load_list({list: id , limit}).catch(error => res.status(500).send(error))
    // expect an array of objects
    // on success return 200 and array
    if(listItems.length){return res.status(200).send(listItems)}
    // on failure return 404 no list found
    else {
      res.status(404).send({message: "No List Found"})
    }
  } ,
  delete(req,res){
    // destructure array id off of req.params
    // establish DB connection
    // qurey DB to remove list items
    // qurey DB to remove list
    // qurey DB to return list array
    // check array to ensure it has been removed
    // return 201 and list item array

  } ,
  async items(req, res){
    let db = req.app.get('db')
    let r = await db.load_list({list: req.params.id , limit: 25}).catch(error => res.status(500).send(error))
    res.status(200).send(r)
  }

}