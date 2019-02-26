import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import Axios from 'axios';
import { getLists, getItems } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { reorder, move, getListStyle, getItemStyle } from '../../lib/dragFuncModule'
import SideDrawer from '../Appbar/SideDrawer'
import "./AddItems.css"
import GeoLocate from './GeoLocateTest'
import geocoding, { location } from 'reverse-geocoding';
import SearchInput from './SearchInput.js'
import Zoom from 'react-reveal/Zoom';


class AddItems extends React.Component {
    constructor() {
        super()
        this.state = {
            itemList: [],
            newList: [],
            listName: '',
            zip: null,
            storeId: 0,
            showInput: false,
            stores: [] ,
            targetStore: {} ,
            toggle: true
        }

        this.onDraggEnd = this.onDraggEnd.bind(this)
    }


    getList = (id) => {
        return this.state[id]
    }

    getStores = async () => {
        let {zip} = this.state
        if(zip.toString().length !== 5 || typeof +zip !== "number"){return console.log("Bad Zip Code")}
        let stores = await Axios.get('/api/' +zip)
        if(Array.isArray(stores.data)){this.setState({stores: stores.data})}
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

    toggleInput = () => {
        this.setState({ showInput: !this.state.showInput })
    }


    // findItem = async (value) => {
    //     let res = await Axios.get(`/search/${this.state.storeId}/${value}`)
    //     this.setState({ itemList: res.data })
    // }

    findItem = async (value) => {
        const {chain , storeId} = this.state.targetStore
        let res = await Axios.get(`/search/${chain}/${storeId}/${value}`)
        this.setState({ itemList: res.data })
    }

    SaveList = async () => {
        let res = await Axios.put(`/item/additems`, { items: this.state.newList, name: this.state.listName })
        if (!res.data) {
            console.log('item retrieval failure')
        }
        this.props.getItems(res.data)
        this.props.history.push('/dashboard')
    }

    //change onkeypress so it doesn't save, make it just display list name

    onKeyPressed=(e)=>{
        if(e.keyCode === 13){
            alert('Saved List Name')
            this.toggleInput()
        }
    }

    updateZip = (t) => {
        this.setState({
            zip: t
        })
        console.log(this.state.zip)
    }

   


    render() {
        let storesList = this.state.stores.map((store , i) => 
            (
                <option key={i} value={i}>{store.name}</option>
            )
        )
        return (
            <div className='addItems'>
            <SideDrawer/>

            <Zoom>
            <div className='header34'>
                <div className='outersearchbox'>
                <div className='searchbox'>
                    <button onClick={this.SaveList}>Save</button>
                    

                    {
                        this.state.showInput ?

                            <input placeholder={'List Name'} onChange={(e) => { this.setState({ listName: e.target.value}) }}
                            onKeyDown={this.onKeyPressed} maxLength='20' />
                            : <button onClick={this.toggleInput} >Save as List</button>
                    }
                    <select onChange={(e) => this.setState({targetStore: this.state.stores[e.target.value]})}>
                        <option value="" disabled selected hidden>Select Store...</option>
                        {storesList}
                    </select>
                    <input placeholder={'ZipCode'} onChange={(e) => this.setState({ zip: e.target.value })} value={this.state.zip}/>
                    <button onClick={this.getStores}>Find Stores</button>
                    <GeoLocate updateZip={ this.updateZip } getStores={ this.getStores }/>
                    <SearchInput findItem={this.findItem}/>
                    </div>
                    </div>



                <div className='search-results'>
                <DragDropContext onDragEnd={this.onDraggEnd} >
                    <Droppable droppableId='itemList'>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className='list' >
                                {this.state.itemList.map((item, i) => (
                                    <Draggable key={item.itemcode} draggableId={item.itemcode} index={i}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <ItemCard item={item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>

                    <div className='space-between'>
                        
                    </div>

                    <Droppable droppableId='newList' >
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className='list'>
                                {this.state.newList.map((item, i) => (
                                    <Draggable key={item.itemcode} draggableId={item.itemcode} index={i} >
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <ItemCard item={item} />
                                            </div>
                                        )}

                                    </Draggable>
                                ))}
                            </div>
                        )}

                    </Droppable>
                </DragDropContext>
                </div>
                </div>
                </Zoom>

            </div>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getLists, getItems })(AddItems)