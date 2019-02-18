import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import ShoppingList from '../ShoppingList/ShoppingList'
import ListOptions from '../ListOptions/ListOptions'
import { connect } from 'react-redux'
import { getUserData, getItems, getLists } from '../../ducks/reducer'
import axios from 'axios'
import SideDrawer from '../Appbar/SideDrawer'
import { DragDropContext } from "react-beautiful-dnd"
import './Dashboard.css'
import { reorder , move } from "../../lib/dragFuncModule"

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
<<<<<<< HEAD
            lists: [
                { id: 1, shopper: 1, name: 'Walmart' },
                { id: 1, shopper: 1, name: 'Smiths' },
                { id: 1, shopper: 1, name: 'Aldi' }
            ],
            itemCards: [
                { name: 'milk', price: 300 , itemcode: 1 , image: "None" },
                { name: 'bread', price: 244 , itemcode: 2 , image: "None" },
                { name: 'carrots', price: 161 , itemcode: 3 , image: "None" },
                { name: 'frog legs', price: 1430 , itemcode: 4 , image: "None" }
            ],
            shopper: [
                { id: 1, name: 'Teddy', phone: 5555555555, state: 'UT', registered: true, budget: null, email: 'teddy@test.com' }
            ],
            shoppingList: [],
=======
            lists: [],
            itemCards: [],
            cart:[{item:'milk', price:344}],
            shopper: [],
>>>>>>> master
            total: 0,
            budget: 0,
            overBudget: 0,
            remaining: 0,
            name: '',
            user: {}
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


        componentDidMount = async() => {
        await axios.get(`/auth/check`)
        .then(res => {
          console.log('current user', res.data)
          this.setState({
           name: res.data[0].name

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

    clickList = () => {
        // sends get request for items in lists
        // sets items to itemCards on state
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

    dragItem = (result) => {
        const { source , destination } = result
        if (!destination){
            return;
        }

        if(source.droppableId === destination.droppableId){
            let list = null;
            switch(source.droppableId){
                case "shoppingList":
                    list = "shoppingList"
                    break;
                case "itemCards":
                    list = "itemCards"
                    break;
                case "listItems":
                    list = "listItems"
                    break;
                default:
                    console.log("dragItem: Unable to determine list. Check switch and droppableId's.")
                    return;
            }
            const reorderedList = reorder(
                this.state[list] ,
                source.index,
                destination.index
            )
            this.setState({[list]: reorderedList})
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
            if(currentTotal < this.state.budget){ currentRemaining = this.state.budget - currentTotal}else{ currentRemaining=0}
            if( currentTotal > this.state.budget){currentOverBudget = currentTotal - this.state.budget}else{ currentOverBudget=0} 
            await this.setState({ total: currentTotal/100, overBudget: currentOverBudget/100, remaining: currentRemaining/100 })
        }

        // media query for card background color to change yellow on 85% of budget used
        // media query for background color change to red when budget has been exceeded
        if (this.state.total > this.state.budget) {
            alert('You are over budget!')
    }
    }





    render() {
        let displayShopper = this.state.shopper.map((el,i)=>{
            return <h3 key={i} >
               <p>{el.name}</p> 
               <p>{el.state}</p>
            
            </h3>
        })
        return (
            <>
            <SideDrawer/>
            welcome {this.state.name}
            {/* <BottomBar style={{width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}}/> */}
           
            <div>
                {displayShopper}
            </div>
            <hr/>
            <input onChange={(e)=>this.setState({budget:e.target.value*100})} placeholder={'Enter Budget'}  />
                <h2>budget: ${+this.state.budget/100}</h2>
                your total is:  ${this.state.total}
                <br />
                you have ${this.state.remaining} left
           <br />
                you are ${this.state.overBudget} over your budget
           <br />
                <button onClick={() => this.handleBudget(this.state.cart)} >calc</button>
                <hr/>
<<<<<<< HEAD
                    <DragDropContext onDragEnd={this.dragItem}>
                <div className="lists-block"> 
                        <ListOptions listsArray={this.state.lists} itemCards={this.state.itemCards} />
                        <ShoppingList items={this.state.shoppingList} />
                </div>
                    </DragDropContext>
=======
                <ListOptions listsArray={this.state.lists} cart={this.state.cart} />
>>>>>>> master
                
            {/* <BottomBar style={{ width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)' }} /> */}
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData, getItems, getLists })(Dashboard)