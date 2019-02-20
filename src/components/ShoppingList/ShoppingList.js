import React from 'react';
import {Droppable , Draggable} from 'react-beautiful-dnd'
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'
import ItemCard from '../ItemCard/ItemCard';
import './ShoppingList.css'

export default class ShoppingList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
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
                        {this.props.items.map((item, i , arr) => (
                            <Draggable
                                key={item.itemcode}
                                draggableId={item.itemcode}
                                index={i}
                            >
                                {(provided , snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                    <ItemCard item={item} classString={arr.slice(0 , i + 1).reduce((total , item) => total + item.price , 0) < this.props.budget ? "green" : "red"}/>
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