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
            toggleLists:true,
            toggleItems:false,

        }
    }



    componentDidMount(){
        console.log('listOPtions', this.props)
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


    render() {
        return (
            <>
            <button onClick={this.toggle}>toggle</button>
            {
                this.state.toggleItems ?
                <ShowItems itemCards={this.props.itemCards}  />
                : <ShowLists lists={this.props.listsArray}  />
            }

                
            </>
        )
    }
}

const mapState = (reduxState) => reduxState;
export default connect(mapState, { getLists, getItems })(ListOptions)