const axios = require('axios')

module.exports = {
  async testWalmart(req, res){
    let answer = await axios.get('https://grocery.walmart.com/v4/api/products/search?storeId=1855&count=2&page=1&offset=0&query=whole milk')
    .catch(err => [])
    let item = answer.data.products[0]
    let name = item.basic.name
    let type = null;
    let brand = null;
    let code = item.USItemId;
    let price = item.store.price.list;
    let store = 2
    // console.log(answer.data)
    return [{name , type , brand , code , price , store}]
  }
}