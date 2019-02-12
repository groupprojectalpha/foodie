import React from 'react';
import BottomBar from '../BottomBar/BottomBar'

export default class Dashboard extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }



    render(){
        return(
            <>
            this is Dashboard
            <BottomBar style={{width: 120, background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}}/>
            </>
        )
    }
}