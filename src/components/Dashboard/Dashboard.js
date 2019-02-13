import React from 'react';
import BottomBar from '../BottomBar/BottomBar'
import ShoppingList from '../ShoppingList/ShoppingList';
import ListOptions from '../ListOptions/ListOptions';
import ShowItems from '../ShowItems/ShowItems';
import ShowLists from '../ShowLists/ShowLists';

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            lists: [],
            itemCards: [],
            // prices: [],
            user: [],
            total: 0,
            budget: 0,
            overBudget: 0
        }
    }

    componentDidMount() {
        // makes axios request for top 20 most popular itemCards
        // makes axios request for user lists ('/user/:id/lists)
        // if no list, route user to AddItems
        // sets lists to lists on state
        // axios request for user profile info
        // sets user info to state
        // sets price response form server to prices on state(pin)
        // sends lists to ShowLists as props
        // sends top 20 most popular itemCards down to ShowItems as props
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

    dragItem = () => {
        // listener for new itemCard in ShoppingList
        // sends itemCard to ShoppingList as prop
        // adds price to total on state
        // invokes handleBudget
    }

    removeCard(){
        // adds itemCard to ShowItem array
        // invokes handleBudget
    }


        // STRETCH GOAL //
    // deleteCard(){
        // sends delete request to DB for itemCard
        // alerts success
    // }


    handleBudget = (value, arr) => {
        // sets value (the shoppers budget) to state
        // loops over the itemCard array
        // calculates total price
        // subtracts remaining from budget on state
        // adds cost exceeded to overBudget on state (pin)
        // media query for card background color to change yellow on 85% of budget used
        // media query for background color change to red when budget has been exceeded
        // alerts user when budget has been exceeded
    }





    render() {
        return (
            <>
                this is Dashboard
            <BottomBar style={{ width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)' }} />
            </>
        )
    }
}