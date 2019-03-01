export function getList(id , state){
  switch (id) {
      case "shoppingList":
          return state.shoppingList
      case "itemCards":
          return state.itemCards
      case "showLists":
          throw new Error("getList: lists array should already be handled!")
      default:
          console.log("getList: Unable to determine list! Check list names and droppable ID's")
          return;
  }
}