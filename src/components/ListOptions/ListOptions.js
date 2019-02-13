import React from 'react';
import { connect } from 'react-redux';
import { getLists, getItems } from './../../ducks/reducer';
import axios from 'axios';


class ListOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    
    toggle = () => {
        // toggles between ShowLists and ShowItems
    }

    handleMoreItems = () => {
        // onClick sends axios request for next ten most popular items
        // sets items to state
        // passes items to ShowItems as props
    }


    render() {
        return (
            <>
                this is ListOptions
            </>
        )
    }
}

const mapState = (reduxState) => reduxState;
export default connect(mapState, { getLists, getItems })(ListOptions)