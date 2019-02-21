import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { type } from 'os';
import { withRouter } from 'react-router-dom';
import SideDrawer from '../Appbar/SideDrawer'
import './Register.css'
import {Link} from 'react-router-dom'
import Inputs from './RegisterInputs'
import Inputs2 from './RegisterInputs2'
import PhoneInput from './PhoneInput'


 class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
            state:'',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            toggle: false
        }
    }

    // firstName:firstName, lastName:lastName,

    async createNewUser()  {
        const { username, password, firstName, lastName, email, phoneNumber, state } =this.state
        let res = await axios.post('/auth/register', {name:username, password:password, email:email, phone:phoneNumber, state:state}).catch(()=>{
            alert('Email already in use')
        })

        if(res.data){
            this.props.history.push('/add')
        }
    }

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
       
    }


    render(){
        return(
            <>
            
            <div className='register'>
             <div id='card3'>
             <div className='card2'>
             <div className='fields'>
                
               {
                  this.state.toggle ? (
                      <>
                      <Inputs2/>
                      <PhoneInput/>
                      <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.toggle()}>back</Button>
                      <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.createNewUser()}>Finish</Button>
                      </>
                  ) :
                  <>
                  <Inputs/>
                  <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.toggle()}>next</Button>
                 
                  </>
                   }    
            </div>   
            <div className='picture'>
                <img id='store' src='https://images.unsplash.com/photo-1528733918455-5a59687cedf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'></img>
            </div>
            </div>    
            </div>
            </div>

            </>
        )
    }
}

export default withRouter(Register)