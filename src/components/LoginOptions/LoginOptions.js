import React from 'react';
import Login from '../Login/Login';
import Alert from '../Login/Alert'
import './LoginOptions.css'
import { useTransition, animated } from 'react-spring'
import logo from '../Logo.svg'


export default class LoginOptions extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
   
   
    render(){
        return(
            <div className='landing'>
                <header className='header-container'></header>
                <div className='main-card'>
                    <img src={logo} className='logo'/>
                    <div>
                <h1>Foodie</h1>
                <h2>Shopping.. Made Easy</h2>
                <Alert/>
                </div>
                </div>
                
               
           
            
            </div>
        )
    }
}