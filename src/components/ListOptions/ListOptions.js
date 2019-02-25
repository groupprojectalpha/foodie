import React from 'react';
import { connect } from 'react-redux';
import { getLists, getItems } from './../../ducks/reducer';
import ShowItems from '../ShowItems/ShowItems';
import ShowLists from '../ShowLists/ShowLists';
import Axios from 'axios';
import './ListOptions.css'
import RevertIcon from './RevertIcon';
import Spinner from 'react-md-spinner';
import Fade from 'react-reveal/Fade';


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
    this.props.handleLoading()
}


    render() {
        let show = this.state.toggleItems ? "My Lists" : "My Items"
        


if (this.props.loading === true) {
    return (
        <Fade>
        <h2>Please be patient while we fetch all your items fresh for the store</h2>
            <Spinner size={100} />
        </Fade>

    )
}
        return (
            
            <>
            <div className="seperator">
            
            { this.state.toggleItems ? <RevertIcon toggle={this.toggle}/> : null}
            </div>
            {
                this.state.toggleItems ?
                <ShowItems toggle={this.toggle} items={this.props.itemCards}  />
                : <ShowLists lists={this.props.listsArray} clickList={this.clickList} />
            }

                
            </>
        )
    }
}

const mapState = (reduxState) => reduxState;
export default connect(mapState, { getLists, getItems })(ListOptions)