import React from 'react';
import { getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux';
import SideDrawer from '../Appbar/SideDrawer'
import axios from 'axios'
import firebase from 'firebase'

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            shopper:[],
            name: ''
        }
    }


    componentDidMount = async() => {
        await axios.get(`/auth/check`)
        .then(res => {
          console.log(res.data[0])
          this.setState({
           name: res.data[0].name
          })
        })

        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
        })
    }


    render(){
       
        return(
            <>
            <SideDrawer/>
            this is 
            {this.state.name}'s
            profile
            </>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData })(Profile)