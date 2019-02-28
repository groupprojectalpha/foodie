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
import Zoom from 'react-reveal/Zoom';

 class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: '',
            password: '',
            state:'',
            email: '',
            phone: 0,
            toggle: false
        }
    }

    async createNewUser()  {
        const { name, password, email, phone, state } =this.state
        let res = await axios.post('/auth/register', {name:name, password:password, email:email, phone: phone, state:state}).catch((err)=>{
            console.log("Server Error: " , err)
            alert('Email already in use')
        })

        if(res && res.data){
            this.props.history.push('/add')
        }
    }

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
       
    }

    handleUpdate = (field , value) => {
        this.setState({[field]: value})
    }


    render(){
        return(
            <>
            <div className='register'>
            <Zoom>
             <div id='card3'>
             <div className='card2'>
             <div className='fields'>
                
               {
                  this.state.toggle ? (
                      <>
                      <Inputs2 handleUpdate={this.handleUpdate} />
                      <PhoneInput handleUpdate={this.handleUpdate} />
                      <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.toggle()}>back</Button>
                      <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.createNewUser()}>Finish</Button>
                      </>
                  ) :
                  <>
                  <Inputs handleUpdate={this.handleUpdate} />
                  <Button style={{ marginTop: '20px', marginRight: '30px'}} variant="outlined" color="black" onClick={() => this.toggle()}>next</Button>
                 
                  </>
                   }    
            </div>   
            <div className='picture'>
                <img id='store' src='https://images.unsplash.com/photo-1528733918455-5a59687cedf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'></img>
            </div>
            </div>    
            </div>
            </Zoom>
            </div>
            </>
        )
    }
}

export default withRouter(Register)