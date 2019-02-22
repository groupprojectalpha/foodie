import React from 'react';
import {Droppable , Draggable} from 'react-beautiful-dnd'
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'
import ItemCard from '../ItemCard/ItemCard';
import './ShoppingList.css'
import Price from '../ItemCard/Price';
import calculateTotal from "../../lib/calcTotal"

export default class ShoppingList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            duplicateCount: 0,
        }
    }

    componentDidUpdate(prevProps){
        let trueTotal = calculateTotal(this.props.items)
        if (prevProps.total === this.props.total){
            this.state.duplicateCount++ } else {this.state.duplicateCount = 0}
        if (this.state.duplicateCount > 3){
            console.log("ShoppingList: Cancelling Budget Handle to avoid loop.")
            console.log(`Duplicate Total: ${this.props.total} typeof ${typeof this.props.total}`)
            console.log("ShoppingList: Cancelling Budget Handle to avoid loop.")
            return;
        }
        if (this.props.total !== trueTotal && this.props.loopBreak){
            this.props.handleBudget()
            console.log(`trueTotal = ${trueTotal} : prevTotal = ${prevProps.total}`)
        }
    }


    render(){
        return(
            <>
            <Droppable droppableId="shoppingList">
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef} 
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="list"
                       
                    >
                        {this.props.items.map((item, i , arr) => (<Draggable
                                key={item.itemcode}
                                draggableId={"S" + item.itemcode}
                                index={i}
                            >
                                {(provided , snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                    <ItemCard item={item} remove={() => this.props.remove(i)} Price={<Price item={item} updateQuantity={this.props.updateQuantity} />} classString={arr.slice(0 , i + 1).reduce((total , item) => total + item.price * item.quantity , 0) < this.props.budget ? "green" : "red"}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
            </>
        )
    }
}