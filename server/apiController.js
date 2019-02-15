const axios = require('axios')

module.exports = {
  async searchWalMart(id , term, req){
    // query the db for the correct store_id
    let db = req.app.get('db')
    let store_id = await db.query(`SELECT store_id FROM store WHERE id = ${id}`)
    // console.log("Store ID" , store_id)
    // Create the correct request, concatenating the storeid and term
    let answer = await axios.get(`https://grocery.walmart.com/v4/api/products/search?storeId=${store_id[0].store_id}&count=10&page=1&offset=0&query=${term}`)
    .catch(err => console.log("WalMart API Error" , err))
    // Loop through the returned array, formatting the returned products and adding the store key with the id value
    let items = answer.data.products.map(item => {
      let name = item.basic.name
      let type = null;
      let brand = null;
      let itemcode = item.USItemId;
      let price = item.store.price.list;
      let store = id
      let image = item.basic.image.thumbnail
      return {name , type , brand , itemcode , price , store , image}
    })
    // return the formatted array
    return items
  }
}