import React from 'react';
import Login from '../Login/Login';
import Alert from '../Login/Alert'
import './LoginOptions.css'
import { useTransition, animated } from 'react-spring'
import logo from '../Logo.svg'
import axios from 'axios'



export default class LoginOptions extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount = async() => {
        console.log('delete session')
        await axios.delete('/auth/logout')
    }
   
   
    render(){
        return(
            <div className='landing'>
                {/* <header className='header-container'> <div id='about'>about</div> </header> */}
                   <div className='top1'>
                        <div className='main-card'>
                            <img src={logo} className='logo'/>
                            <div className='words'>
                                <h1 id='text'>Budget Butler</h1>
                                <h2 id='text2'>Shopping.. Made Easy</h2>
                                <h5 id='text3'>A virtual accountant for your quick shopping trip. Get started below!</h5>
                                <Alert/>
                            </div>
                        </div>
                        <div className='boxes'>
                            <div className='box1'>
                            <img id='boximage1' src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"/>
                            </div>
                            <div className='box2'>
                            <img id='boximage1' src="https://images.unsplash.com/photo-1545269041-0faf48914252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"/>
                            </div>
                        </div>
                    </div> 
                
                
               
           
            
            </div>
        )
    }
}