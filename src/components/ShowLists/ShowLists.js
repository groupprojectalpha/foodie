import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {getListStyle , getItemStyle} from '../../lib/dragFuncModule'

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
                                    {list.name}
                                </div>
                            )}
                        </Draggable>
                    ))}
                </div>
            )}
        </Droppable>
    )
}