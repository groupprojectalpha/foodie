import React from 'react';
import Axios from 'axios'
import ItemCard from '../ItemCard/ItemCard';

export default class AddItems extends React.Component {
    constructor() {
        super()
        this.state = {
            itemList:[],
            newList: [],
            zip:0,
        }
    }

    // { item: 'milk', price: 3 },
    //         { item: 'bread', price: 2 },
    //         { item: 'carrots', price: 1 },
    //         { item: 'frog legs', price: 14 }

    findItem = async (value) => {
        // makes api call for items
      let res = await Axios.get(`/search/2/${value}`)
      this.setState({itemList:res.data})
        // sets state with items
        // sends data to redux, then to dashboard
    }

    findStore(e) {
        switch (e) {
            case 'walmart':
                //axios request for walmart with zip from this.state
                
                break;
            case 'smiths':
                //axios request for smiths with zip from this.state
               
                break;
            case 'aldi':
            // axios request for aldi with zip from this.state
            
        }
    }



    render() {
        let itemCard = this.state.itemList.map((el, i) => {
            return <ItemCard item={el} key={i} />
        })
        console.log(this.state.newList)
        return (
            <>
                this is AddItems
            <input placeholder={'Search'} onChange={(e)=>this.findItem(e.target.value)} />
                <button>Save Items</button>
                <input placeholder={'List Name'} onChange={(e) => { this.setState({ newList: e.target.value }) }} />
                <button onClick={() => { }} >Save List</button>
                <select onChange={(e) => this.findStore(e.target.value)}>
                    <option value='' >Please select store</option>
                    <option value='walmart' >Walmart</option>
                    <option value='smiths' >Smiths</option>
                    <option value='aldi' >Aldi</option>
                </select>
                <input placeholder={'ZipCode'} onChange={(e)=>this.setState({zip:e.target.value})} />
                <hr />
                {itemCard}
            </>
        )
    }
}