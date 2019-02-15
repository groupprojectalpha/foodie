import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import Axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { reorder , move , getListStyle , getItemStyle } from '../../lib/dragFuncModule'

export default class AddItems extends React.Component {
    constructor() {
        super()
        this.state = {
            itemList: [],
            newList: [],
            zip: 0,
            storeId: 0
        }

        this.onDraggEnd = this.onDraggEnd.bind(this)
    }

    getList = (id) => {
        return this.state[id]
    }

    onDraggEnd(result) {
        const { source, destination } = result
        if (!destination) {
            return;
        }


        if (source.droppableId === destination.droppableId) {
            let list = null
            switch (source.droppableId) {
                case "itemList":
                    list = 'itemList'
                    break;
                case 'newList':
                    list = "newList"
                    break;
                default:
                    console.log('onDraggEnd: no list found. check list names and droppableIds')
                    return;

            }
            const reorderedList = reorder(this.state[list], source.index, destination.index)
            this.setState({ [list]: reorderedList })
        }

        else {
            let result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            )
            this.setState({
                itemList: result.itemList,
                newList: result.newList
            })
        }
    }


    findItem = async (value) => {
        // makes api call for items
        let res = await Axios.get(`/search/${this.state.storeId}/${value}`)
        this.setState({ itemList: res.data })
        // sets state with items
        // sends data to redux, then to dashboard
    }

    findStore(e) {
        switch (e) {
            case 'walmart':
                this.setState({ storeId: 2 })

                break;
            case 'smiths':
                this.setState({ storeId: 4 })

                break;
            case 'aldi':
                this.setState({ storeId: 6 })

        }
    }



    render() {
        return (
            <>
                this is AddItems
            <input placeholder={'Search'} onChange={(e) => this.findItem(e.target.value)} />
                <button>Save Items</button>
                <input placeholder={'List Name'} onChange={(e) => { this.setState({ newList: e.target.value }) }} />
                <button onClick={() => { }} >Save List</button>
                <select onChange={(e) => this.findStore(e.target.value)}>
                    <option value='' >Please select store</option>
                    <option value='walmart' >Walmart</option>
                    <option value='smiths' >Smiths</option>
                    <option value='aldi' >Aldi</option>
                </select>
                <input placeholder={'ZipCode'} onChange={(e) => this.setState({ zip: e.target.value })} />
                <hr />
                <DragDropContext onDragEnd={this.onDraggEnd} >
                    <Droppable droppableId='itemList'>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} >
                                {this.state.itemList.map((item, i) => (
                                    <Draggable key={item.code} draggableId={item.code} index={i}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}>
                                                <ItemCard item={item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>


                    <Droppable droppableId='newList' >
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.newList.map((item, i) => (
                                    <Draggable key={item.code} draggableId={item.code} index={i} >
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging , provided.draggableProps.style)}>
                                                <ItemCard item={item} />
                                            </div>
                                        )}

                                    </Draggable>
                                ))}
                            </div>
                        )}

                    </Droppable>
                </DragDropContext>
            </>
        )
    }
}