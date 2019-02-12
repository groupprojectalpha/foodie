import React from 'react';
import { connect } from 'react-redux';
import { getLists, getItems } from './../../ducks/reducer';
import axios from 'axios';


class ListOptions extends React.Component {
    constructor() {
        super()
        this.state = {

        }
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