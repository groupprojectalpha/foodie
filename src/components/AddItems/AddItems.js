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
import ZipInput from './ZipInput';
import StoreSelect from './StoreSelect'
import LocationButton from './LocationButton'
import SearchButton from './SearchButton'
import ToggleButton from './ToggleButton'
import Buttons from './Buttons'
import SaveButton from './SaveButton'
import SaveListButton from './SaveListButton'
import Headers from '../Headers'

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
            toggle: true,
            zipClass: "zip-true"
        }

        this.onDraggEnd = this.onDraggEnd.bind(this)
    }

    componentDidUpdate(p , s){
        if(!this.state.zip || !s.zip){return;}
        if(this.state.zip.length === 5 && s.zip.length !== 5){
            this.getStores()
        }
        if(this.state.zip.length !== 5 && s.zip.length === 5){
            this.setState({stores: []})
        }
    }


    getList = (id) => {
        return this.state[id]
    }

    getStores = async () => {
        let {zip} = this.state
        if(!zip){return this.noZip();}
        if(zip.toString().length !== 5 || typeof +zip !== "number"){return console.log("Bad Zip Code")}
        let stores = await Axios.get('/api/' +zip)
        if(Array.isArray(stores.data)){this.setState({stores: stores.data})}
    }
    
    noZip = () => {
        console.log("noZip invoked")
        this.setState({zipClass: "zip-false"})
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
        if(!value){return;}
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
    }

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })

    }

    updateStore = (e) => {
        this.setState({
            targetStore: this.state.stores[e.target.value]
        })
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
                    
                    

                 { this.state.toggle ? 
                    <>
                    {/* <select onChange={(e) => this.setState({targetStore: this.state.stores[e.target.value]})}>
                        <option value="" disabled selected hidden>Select Store...</option>
                        {storesList}
                    </select> */}
                    
                    {/* <input placeholder={'ZipCode'} onChange={(e) => this.setState({ zip: e.target.value })} value={this.state.zip}/> */}
                    <div className='zip-container'>
                    <ZipInput updateZip={this.updateZip} val={this.state.zip}/>
                    <GeoLocate updateZip={ this.updateZip } getStores={ this.getStores }/>
                    </div>
                    <StoreSelect updateStore={this.updateStore} storesList={storesList} value={this.state.targetStore.id} />
                    <div className='zip-container'>
                    {/* <SearchButton getStores={this.getStores}/> */}
                    <ToggleButton toggle={this.toggle}/>
                    </div>
                    </>

                    :
                    <>
                    <SearchInput  findItem={this.findItem}/>
                    
                    
                    {
                        this.state.showInput ?
                            <>
                            <input id="listname" placeholder={'List Name'} onChange={(e) => { this.setState({ listName: e.target.value}) }}
                            onKeyDown={this.onKeyPressed} maxLength='20' />
                            <SaveButton saveList={this.SaveList}/>
                            </>
                            :   <div style={{display: "flex"}}>
                                <SaveButton saveList={this.SaveList} title="Save to Favorites"/>
                                <SaveListButton toggleInput={this.toggleInput}/>
                            </div>
                    }
                    
                    <Buttons toggle={this.toggle}></Buttons>
                    </>
                    }


                    </div>
                    </div>



                <div className='search-results'>
                <DragDropContext onDragEnd={this.onDraggEnd} >

                    <div>

                    <Headers title={this.state.listName ? this.state.listName : "Favorites"}/>
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
                        </div>
                    <div className='space-between'>
                        
                    </div>
                    <div>
                    <Headers title="items"/>
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
                        </div>
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