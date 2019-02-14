const initialState = {
  lists: [],
  items: [],
  user:{}
}

const GET_LISTS = 'GET_LISTS'
const GET_ITEMS = 'GET_ITEMS'
const GET_USER_DATA = 'GET_USER_DATA'

export function getUserData(userData){
  return{
    type:GET_USER_DATA,
    payload: userData
  }
}

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

      case GET_USER_DATA: 
      return { ...state, getUserData: action.payload}

    default:
      return state
  }
}