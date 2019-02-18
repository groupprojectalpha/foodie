import React from 'react';
import {Droppable , Draggable} from 'react-beautiful-dnd'
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'
import ItemCard from '../ItemCard/ItemCard';

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
                    >
                        {this.props.items.map((item, i) => (
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
                                    <ItemCard item={item}/>
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