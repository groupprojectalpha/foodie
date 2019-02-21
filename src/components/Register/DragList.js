import React, { Component } from 'react'
import ListOptions from '../ListOptions/ListOptions'
import { DragDropContext } from "react-beautiful-dnd"
import ShoppingList from '../ShoppingList/ShoppingList'


class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            shopper:[],
            name: '',
            profilePic: '',
            email: '',
            providerId: ''
        }
    }

    dragItem = (result) => {
        const { source, destination } = result
        if (!destination) {
            return;
        }}

    render(){

        return(
            <>
              <DragDropContext onDragEnd={this.dragItem}>
                    <div className="lists-block">
                        <ShoppingList items={this.state.shoppingList} budget={this.state.budget} />
                        <ListOptions listsArray={this.state.lists} itemCards={this.state.itemCards} clickList={this.clickList} />
                    </div>
                </DragDropContext>
            </>
        )
    }

}

export default List