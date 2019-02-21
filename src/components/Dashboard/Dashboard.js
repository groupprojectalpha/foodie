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
import CardFlip from './CardFlip'
import { Spring } from 'react-spring/renderprops';
import BudgetInput from './BudgetInput'
import Logo from '../Logo.svg'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade'
import Bounce from 'react-reveal/Bounce'
import ToggleButton from './ToggleButton.js';
import TrashButton from './TrashButton'


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
            profilePic: '',
            email: '',
            providerId: '',
            user: {},
            toggle: true,
            hidden: false
        }
    }
    // makes axios request for top 20 most popular itemCards
    componentDidMount = async() => {
     let res = await axios.get(`/auth/check`)
                this.setState({
                    user: res.data,
                    name: res.data[0].name,
                    profilePic: res.data[0].photoURL,
                    email: res.data[0].email,
                    providerId: res.data[0].providerId
                })
                axios.get(`/user/lists`)
                .then(res => {
                        this.setState({
                            lists: res.data
                        })
                    })

                    axios.get(`/item/all`).then((reply)=>{
                        this.setState({itemCards:reply.data})
                        console.log(reply.data)
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

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
       
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
     this.rankUp()
      axios.delete('/list/clear')
        axios.put('/item/additems', {
            name: 'clearabledefault',
            items: this.state.shoppingList
        })
        const { phone } = this.state.user[0]
        let res =  axios.get(`/text/${phone}`).then(() => {
        }).catch(error => { console.log(res, error) })
    }

    rankUp(){
        this.state.shoppingList.forEach((item)=>{
            axios.put(`/list/rank/${item.id}`)
        })
    }

   handleBudgetInput = (e) => {
       this.setState({
        budget: e * 100
       })
   }







    render() {
        console.log(this.state)
        return (


            
            <div className='dashboard'>
                <SideDrawer />
                welcome {this.state.name}

{ this.state.toggle ? (

    <div className='budget-container'>
    <Zoom>
    <div className='budget-card'>
    <div id='budget-face'>
    <img src={Logo} className='logo-dash'/>
    <h1>welcome</h1>
    <h3>{this.state.name}</h3>
    
    <BudgetInput handleBudgetInput={this.handleBudgetInput}></BudgetInput>
    
    <ToggleButton toggle={this.toggle}/>
    </div>
    </div>
    </Zoom>
    </div>

) : (
    <>
              
               <Fade>
                <div className='calculator-card'>
                            {/* <input onChange={(e) => this.setState({ budget: e.target.value * 100 })} placeholder={'Enter Budget'} />
                            <input onChange={(e)=> {this.handleBudgetInput(e)}}></input> */}
                            <h2>budget: ${+this.state.budget / 100} </h2>
                            <p>your total is:  ${this.state.total}</p>
                            <p>you have ${this.state.remaining} left</p>
                            <p>you are ${this.state.overBudget} over your budget</p>
                            {/* <button onClick={() => this.handleBudget(this.state.shoppingList)} >calc</button> */}
                            <TrashButton toggle={this.toggle} handleBudget={()=>this.handleBudget(this.state.shoppingList)}/>
                </div>
                </Fade>
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
                )}
            </div>
            
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData, getItems, getLists })(Dashboard)