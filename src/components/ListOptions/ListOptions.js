import React from 'react';
import { connect } from 'react-redux';
import { getLists, getItems } from './../../ducks/reducer';
import ShowItems from '../ShowItems/ShowItems';
import ShowLists from '../ShowLists/ShowLists';
import Axios from 'axios';


class ListOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleItems:false,

        }
    }



    componentDidMount(){
        // get list items and lists
        Axios.get('/')
        // pass lists and list items down to ShowItems and Show Lists
    }

    
     toggle = () => {
        this.setState({ toggleItems: !this.state.toggleItems })
    }


    handleMoreItems = () => {
        // onClick sends axios request for next ten most popular items
        // sets items to state
        // passes items to ShowItems as props
    }

    clickList = (id) => {
        this.toggle()
        this.props.clickList(id)
    }


    render() {
        let show = this.state.toggleItems ? "My Lists" : "My Items"
        return (
            <>
            <button onClick={this.toggle}>{show}</button>
            {
                this.state.toggleItems ?
                <ShowItems items={this.props.itemCards}  />
                : <ShowLists lists={this.props.listsArray} clickList={this.clickList} />
            }

                
            </>
        )
    }
}

const mapState = (reduxState) => reduxState;
export default connect(mapState, { getLists, getItems })(ListOptions)