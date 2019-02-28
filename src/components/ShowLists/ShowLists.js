import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'
import './ShowLists.css';
import ListCard from '../ListCard/ListCard';
import Headers from '../Headers'

export default function ShowList(props){
    return(
        <div>
            <Headers title='My Lists'/>
        <Droppable droppableId="showLists">
            {(provided , snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="list"
                >
                    {/* <div className="scrollbox"> */}
                    {props.lists.map((list, i) => (
                        <Draggable
                            key={list.id}
                            draggableId={list.id}
                            index={i}
                        >
                            {(provided , snapshot) => (
                                
                                <div
                                    ref={provided.innerRef}
                                    style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    onClick={() => props.clickList(list.id)}
                                >
                                    <ListCard list={list}/>
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