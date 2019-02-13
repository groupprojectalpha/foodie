import React from 'react';
import BottomBar from '../BottomBar/BottomBar'
import ShoppingList from '../ShoppingList/ShoppingList';
import ListOptions from '../ListOptions/ListOptions';
import Axios from 'axios';
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            lists: [
                { id: 1, shopper: 1, name: 'Walmart' },
                { id: 1, shopper: 1, name: 'Smiths' },
                { id: 1, shopper: 1, name: 'Aldi' }
            ],
            itemCards: [{ item: 'milk', price: 3 }, { item: 'bread', price: 2 }, { item: 'carrots', price: 1 }, { item: 'frog legs', price: 14 }],
            user: [],
            total: 0,
            budget: 21,
            overBudget: 0,
            remaining: 0
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


    // componentDidMount() {
    //     if(!this.props.getUserData){
    //         this.props.push('/add_items')
    //     }
    //      const userList = Axios.get(`/user/ ${this.props.getUserData.id}/lists` )
    //     if(!userList){
    //         this.props.push('/add_items')
    //     }
    //     this.setState({lists:userList})
    //     this.setState({user: this.props.getUserData})
    // }

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

    dragItem = () => {
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


    // sets value (the shoppers budget) to state
    // loops over the itemCard array
    // calculates currentTotal price
    // subtracts currentRemaining from budget on state
    // adds cost exceeded to currentOverBudget on state (pin)
    // alerts user when budget has been exceeded
    handleBudget = (arr) => {
        // this.setState({budget: value})
        let currentTotal = 0;
        let currentRemaining = 0;
        let currentOverBudget = 0;
        for (let i = 0; i < arr.length; i++) {
            currentTotal += arr[i].price
            currentRemaining = this.state.budget - currentTotal
            // currentOverBudget = this.state.budget 
            this.setState({ total: currentTotal, overBudget: currentOverBudget, remaining: currentRemaining })
            if (currentOverBudget > this.state.budget) {
                alert('You are over budget!')
            }
        }
        // media query for card background color to change yellow on 85% of budget used
        // media query for background color change to red when budget has been exceeded
    }





    render() {
        return (
            <>

                your total is:  ${this.state.total}
                <br />
                you have ${this.state.remaining} left
           <br />
                you are ${this.state.overBudget} over your budget
           <br />
                <button onClick={() => this.handleBudget(this.state.itemCards)} >calc</button>
                {/* <ShoppingList/> */}
                <ListOptions listsArray={this.state.lists} itemCards={this.state.itemCards} />
                this is Dashboard
            {/* <BottomBar style={{ width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)' }} /> */}
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData })(Dashboard)