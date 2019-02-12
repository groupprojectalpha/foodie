const initialState = {
  lists: [],
  items: [],
}

const GET_LISTS = 'GET_LISTS'
const GET_ITEMS = 'GET_ITEMS'

export function getLists(lists) {
  return {
    type: GET_LISTS,
    payload: lists
  }
}



export function getItems(items) {
  return {
    type: GET_ITEMS,
    payload: items
  }
}

export default function (state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case GET_LISTS:
      return { ...state, getLists: action.payload }

    case GET_ITEMS:
      return { ...state, getItems: action.payload }

    default:
      return state
  }
}