import {getList} from '../logic/dashboardLogic'
import {reorder} from '../lib/dragFuncModule'

let state = {
  shoppingList: ["shoppingList"],
  itemCards: ["itemCards"],
  invalid: null,
}

describe('Tests the getList function' , () => {
  test('Should return undefined if given no id' , () => {
    expect(getList()).toBe(undefined)
  })
  test('Should return "shoppingList" if given the id "shoppingList' , () => {
    expect(getList("shoppingList" , state)).toEqual(expect.arrayContaining(["shoppingList"]))
  })
  test('Should return "itemCards" if given the id "itemCards' , () => {
    expect(getList("itemCards" , state)).toEqual(expect.arrayContaining(["itemCards"]))
  })
  // test("Should throw error when invoked with showLists" , () => {
  //   expect(getList("showLists" , state)).toThrow("Unable to determine list")
  // })
})

const reorderArray = [ 1, 2 , 3, 4, 5]

describe('Tests the reorder function' , () => {
  test('Should return different array' , () => {
    expect(reorder(reorderArray , 0 , 0)).not.toBe(reorderArray)
  })
  test('Should return an equal array if given identical second and third params' , () => {
    expect(reorder(reorderArray , 0 , 0)).toEqual(expect.arrayContaining(reorderArray))
  })
})