import React from 'react';
import ShoppingList from '../ShoppingList/ShoppingList'
import ListOptions from '../ListOptions/ListOptions'
import { connect } from 'react-redux'
import { getUserData, getItems, getLists } from '../../ducks/reducer'
import axios from 'axios'
import SideDrawer from '../Appbar/SideDrawer'
import { DragDropContext } from "react-beautiful-dnd"
import './Dashboard.css'
import { reorder, move } from "../../lib/dragFuncModule"

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            lists: [],
            itemCards: [],
            shoppingList: [],
            shopper: [],
            total: 0,
            budget: 0,
            overBudget: 0,
            remaining: 0,
            name: '',
            user: []
            // prices: [],
        }
    }

    // checks for user on session, if not redirects to AddItems
    // if user =>
    // makes axios request for top 20 most popular itemCards
    // makes axios request for user lists ('/user/:id/lists)
    // if no list, route user to AddItems
    // sets lists to lists on state
    // sets user info to state


    componentDidMount = () => {
        axios.get(`/auth/check`)
            .then(res => {
                console.log('current user', res.data)
                this.setState({
                    name: res.data[0].name,
                    user: res.data
                })
                axios.get('/user/lists')
                    .then(res => {
                        this.setState({
                            lists: res.data
                        })
                    })
            })


        // if(!this.props.getUserData){
        //     this.props.push('/add')
        // }
        //  const userList = Axios.get(`/user/ ${this.props.getUserData.id}/lists` )
        // if(!userList){
        //     this.props.push('/add')
        // }
        // this.setState({lists:userList})
        // this.setState({user: this.props.getUserData})
    }

    clickList = (id) => {
        // sends get request for items in lists
        axios.get(`/list/${id}/items`)
            .catch(er => console.log(er))
            // sets items to itemCards on state
            .then((res) => this.setState({ itemCards: res.data }))
        // sets prices from server response to prices(pin)
        // sends items to ShowItems as props
    }

    getList = (id) => {
        switch (id) {
            case "shoppingList":
                return this.state.shoppingList
            case "itemCards":
                return this.state.itemCards
            case "showLists":
                throw new Error("getList: lists array should already be handled!")
            default:
                console.log("getList: Unable to determine list! Check list names and droppable ID's")
                return;
        }
    }


    dragItem = (result) => {
        const { source, destination } = result
        if (!destination) {
            return;
        }
       


        // THIS FIRST SECTION REORDERS AN ARRAY, IF THE ITEM IS GETTING MOVED FROM AN ARRAY TO AN ARRAY //
        if (source.droppableId === destination.droppableId) {
            let list = null;
            switch (source.droppableId) {
                case "shoppingList":
                    list = "shoppingList"
                    break;
                case "itemCards":
                    list = "itemCards"
                    break;
                case "listItems":
                    list = "listItems"
                    break;
                case "showLists":
                    list = "lists"
                    break;
                default:
                    console.log("dragItem: Unable to determine list. Check switch and droppableId's.")
                    return;
            }
            const reorderedList = reorder(
                this.state[list],
                source.index,
                destination.index
            )
            this.setState({ [list]: reorderedList })
            return;
        } else {
            // THIS SECTION ENSURES WE CAN'T DROP ITEMS INTO THE LISTS ARRAY  //
            if (source.droppableId === "showLists") {
                axios.get(`/list/${result.draggableId}/items`)
                    .then((res) => {
                        this.setState({
                            shoppingList: res.data
                        })
                    })
            } else if (destination.droppableId === "showLists") {
                return;

            } else {
                // THIS SECTION CHECKS TO BE SURE AN ITEM INSTANCE IS NOT PRESENT ON THE TARGET ARRAY //
                // IF IT IS, IT INCREMENTS THE "QUANTITY" PROPERTY AND ENDS THE FUNCTION WITHOUT MOVING THE ITEM OVER //
                let itemId = result.draggableId.slice(1)
                let isMatch = false
                this.getList(destination.droppableId).forEach((item) => {
                    if (itemId === item.itemcode) {
                        isMatch = true;
                        if (item.quantity) { item.quantity += 1 }
                        return;
                    }
                })
                if (isMatch) { return; }
                // IF THE ITEM ISN'T PRESENT ON THE TARGET ARRAY, THIS SECTION MOVES IT OVER AND REORDERS BOTH ARRAYS //
                let r = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                )
                this.setState({
                    shoppingList: r.shoppingList,
                    itemCards: r.itemCards
                })
                
            }
        }

        setTimeout(()=>{
            this.handleBudget(this.state.shoppingList)
        },0)
        
    }

    removeCard = (index) => {
        // REMOVES CARD FROM SHOPPINGLIST //
        let newShoppingList = this.state.shoppingList.slice()
        newShoppingList.splice(index , 1)
        this.setState({shoppingList: newShoppingList})
    }


    // STRETCH GOAL //
    // deleteCard(){
    // sends delete request to DB for itemCard
    // alerts success
    // }

    handleBudget = async (arr) => {
        let currentTotal = 0;
        let currentRemaining = 0;
        let currentOverBudget = 0;
        for (let i = 0; i < arr.length; i++) {
            currentTotal += arr[i].price * arr[i].quantity
            if (currentTotal < this.state.budget) { currentRemaining = this.state.budget - currentTotal } else { currentRemaining = 0 }
            if (currentTotal > this.state.budget) { currentOverBudget = currentTotal - this.state.budget } else { currentOverBudget = 0 }
            await this.setState({ total:Math.floor(currentTotal*100)/100, overBudget:Math.floor(currentOverBudget*100)/100 , remaining: Math.floor(currentRemaining*100)/100  })
        }
    }

    updateQuantity = (id, newPrice) => {
        let targetIndex = this.state.shoppingList.findIndex((item) => item.id === id)
        let newShoppingList = this.state.shoppingList.slice()
        newShoppingList[targetIndex].quantity = newPrice
        if (targetIndex !== -1) { this.setState({ shoppingList: newShoppingList }) }
        else { console.log("updateQuantity: No Object Found!") }
    }
    sendText =  () => {
      axios.delete('/list/clear')
        axios.put('/item/additems', {
            name: 'clearabledefault',
            items: this.state.shoppingList
        })
        const { phone } = this.state.user[0]
        let res =  axios.get(`/text/${phone}`).then(() => {
        }).catch(error => { console.log(res, error) })
    }








    render() {
        let displayShopper = this.state.shopper.map((el, i) => {
            return <h3 key={i} >
                <p>{el.name}</p>
                <p>{el.state}</p>

            </h3>
        })
        return (
            <>
                <SideDrawer />
                welcome {this.state.name}
                {/* <BottomBar style={{width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}}/> */}

                <div>
                    {displayShopper}
                </div>
                <hr />
                <input onChange={(e) => this.setState({ budget: e.target.value * 100 })} placeholder={'Enter Budget'} />
                <h2>budget: ${+this.state.budget / 100}</h2>
                your total is:  ${this.state.total/100}
                <br />
                you have ${this.state.remaining/100} left
           <br />
                you are ${this.state.overBudget/100} over your budget
           <br />
                <button onClick={() => this.sendText()} >text</button>

                <hr />
                <DragDropContext onDragEnd={this.dragItem}>
                    <div className="lists-block">
                        <ShoppingList items={this.state.shoppingList} budget={this.state.budget} updateQuantity={this.updateQuantity} remove={this.removeCard} />
                        <ListOptions listsArray={this.state.lists} itemCards={this.state.itemCards} clickList={this.clickList} />
                    </div>
                </DragDropContext>
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData, getItems, getLists })(Dashboard)