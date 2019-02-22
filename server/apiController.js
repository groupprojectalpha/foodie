const axios = require('axios')

module.exports = {
  async searchWalMart(store , term){
    // Create the correct request, concatenating the storeid and term
    let answer = await axios.get(`https://grocery.walmart.com/v4/api/products/search?storeId=${+store}&count=10&page=1&offset=0&query=${term}`)
    .catch(err => console.log("WalMart API Error" , err))
    // Loop through the returned array, formatting the returned products and adding the store key with the id value
    let items = answer.data.products.map(item => {
      let name = item.basic.name
      let type = null;
      let brand = null;
      let itemcode = item.USItemId;
      let price = item.store.price.list;
      let image = item.basic.image.thumbnail
      let chain = 2
      return {name , type , brand , itemcode , price , store , image , chain}
    })
    // return the formatted array
    return items
  } ,
  async getStores(req, res){
    let storesArr = [];
    let walmartRes = await axios.get('https://grocery.walmart.com/v4/api/serviceAvailability?postalCode=' + req.params.zip).catch(err => res.status(500).send("DB Error on GetStores" + err))
    let walmartParsed = walmartRes.data.accessPointList.filter((store) => store.fulfillmentType === "INSTORE_PICKUP").map(store => ({storeId: +store.dispenseStoreId , name: store.name , chain: 2}))
    storesArr.push(... walmartParsed)
    res.status(200).send(storesArr)
  } ,
  async getWalmartItem(store , code){
    let itemRes = await axios.get(`https://grocery.walmart.com/v3/api/products/${code}?itemFields=all&storeId=${store}`).catch(() => console.log("WalMart API Error"))
    let item = itemRes.data
    let name = item.basic.name
    let type = null;
    let brand = null;
    let itemcode = item.USItemId
    let price = item.store.isInStock ? item.store.price.list : 0
    let image = item.basic.image.thumbnail
    return {name , type , brand , itemcode , price , store , image}
  } ,
}