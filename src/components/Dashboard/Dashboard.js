import React from 'react';
import BottomBar from '../BottomBar/BottomBar'
import firebase from 'firebase';
import { Link } from 'react-router-dom';


export default class Dashboard extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }



    render(){
        return(
            <>
            <Link to='/' style={{ textDecoration: 'none' }}>
             <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
            </Link>
            this is Dashboard
            <BottomBar style={{width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}}/>
           
            </>
        )
    }
}