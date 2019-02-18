import React from 'react';
import { getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux';
import SideDrawer from '../Appbar/SideDrawer'
import axios from 'axios'
import firebase from 'firebase'
import Circle from './Circle'
import './Profile.css'
import { isNull } from 'util';

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            shopper:[],
            name: '',
            profilePic: '',
            email: '',
            providerId: ''
        }
    }


    componentDidMount = async() => {
        await axios.get(`/auth/check`)
        .then(res => {
          console.log(res.data[0])
          this.setState({
           name: res.data[0].displayName,
           profilePic: res.data[0].photoURL,
           email: res.data[0].email,
           providerId: res.data[0].providerId
          })
        })

        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
        })
    }
 

    render(){
       const { providerId } = this.state
        return(
            <div className='profile'>
            <SideDrawer/>
          
    
            <div className='card'>
                
                <div className='top'>
                <Circle id='circle' image={this.state.profilePic}/>
                
               { providerId === 'facebook.com' ? 
               <span className='icons'>
               <i class="fab fa-facebook-f"></i>
               </span>
               : 
               providerId === 'twitter.com' ? 
               <span className='icons'>
               <i class="fab fa-twitter"></i>
               </span>
               :
               providerId === 'google.com' ?
               <span className='icons'>
               <i class="fab fa-google"></i>
               </span>
                :
                null
            }

                <h5 id='name'>{this.state.name}</h5>
                
                </div>
                
                <div id='bottom'>

                </div>
            </div>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState
export default connect(mapState, { getUserData })(Profile)