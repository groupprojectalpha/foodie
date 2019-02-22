import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'
import Fade from 'react-reveal/Fade'
import './ShowLists.css'

export default function ShowList(props){
    return(
        <Droppable droppableId="showLists">
            {(provided , snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="list"
                >
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
                                <div id='list-boxes'>
                                <div id='list-faces'>
                                <p id='list-names'>{list.name}</p>
                                </div>
                                </div>
                                    
                                </div>
                                
                            )}
                        </Draggable>
                    ))}
                </div>
            )}
        </Droppable>
    )
}