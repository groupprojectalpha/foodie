import React from 'react';
import { getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux';

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            shopper:[]

        }
    }


    componentDidMount(){
        this.setState({shopper:this.props.user})
    }


    render(){
       
        return(
            <>
            this is Profile
            {this.state.shopper.name}
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData })(Profile)