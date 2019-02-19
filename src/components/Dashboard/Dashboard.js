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
                    user:res.data
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

    dragList = () => {
        // listener for new list in ShoppingList
        // on new list  sends axios request for list_items table to fetch items
        // sets items to state
        // sends items as props to ShoppingList
        // adds prices to total on state
        // invokes handleBudget
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
        // listener for new itemCard in ShoppingList
        // sends itemCard to ShoppingList as prop
        // adds price to total on state
        // invokes handleBudget
    }

    removeCard() {
        // adds itemCard to ShowItem array
        // invokes handleBudget
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
            currentTotal += arr[i].price
            if (currentTotal < this.state.budget) { currentRemaining = this.state.budget - currentTotal } else { currentRemaining = 0 }
            if (currentTotal > this.state.budget) { currentOverBudget = currentTotal - this.state.budget } else { currentOverBudget = 0 }
            await this.setState({ total: currentTotal / 100, overBudget: currentOverBudget / 100, remaining: currentRemaining / 100 })
        }

        // media query for card background color to change yellow on 85% of budget used
        // media query for background color change to red when budget has been exceeded
        if (this.state.total > this.state.budget) {
            alert('You are over budget!')
        }
    }

    sendText = async () => {
        // await axios.delete('/list/clear')
        axios.put('/item/additems',{
            name:'clearabledefault',
            items:this.state.shoppingList
        })
        const { phone } = this.state.user[0]
        let res = await axios.get(`/text/${phone}`).then(() => {
        }).catch(error => { console.log(res,error) })
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
                your total is:  ${this.state.total}
                <br />
                you have ${this.state.remaining} left
           <br />
                you are ${this.state.overBudget} over your budget
           <br />
                <button onClick={() => this.handleBudget(this.state.shoppingList)} >calc</button>
                <button onClick={() => this.sendText()} >text</button>

                <hr />
                <DragDropContext onDragEnd={this.dragItem}>
                    <div className="lists-block">
                        <ShoppingList items={this.state.shoppingList} budget={this.state.budget} />
                        <ListOptions listsArray={this.state.lists} itemCards={this.state.itemCards} clickList={this.clickList} />
                    </div>
                </DragDropContext>

                {/* <BottomBar style={{ width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)' }} /> */}
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData, getItems, getLists })(Dashboard)