import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd"
import { getListStyle, getItemStyle} from "../../lib/dragFuncModule"
import ItemCard from '../ItemCard/ItemCard';
import Headers from '../Headers'

export default function ShowItems(props){
    return(
        <div>
        <Headers title={'My Items'}/>
        {/* <button onClick={props.toggle}>revert</button> */}
        <Droppable droppableId="itemCards">
            {(provided , snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="list"
                >
                    {/* <div className="scrollbox"> */}
                    {props.items.map((item , i) => (
                        <Draggable
                            key={item.itemcode}
                            draggableId={"I" + item.itemcode}
                            index={i}
                        >
                            {(provided , snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                >
                                 <ItemCard item={item}/>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {/* </div> */}
                </div>
            )}
        </Droppable>
        </div>
    )
}