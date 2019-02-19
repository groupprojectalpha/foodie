import React from 'react';
import axios from 'axios';

export default class Mobile extends React.Component{
    state={
        list:[],
        user:[]
    }
    async componentDidMount(){
       let user = await axios.get('/auth/check')
        this.setState({user:user.data})
      let list = await axios.get(`/list/${this.props.match.params.id}`)
       this.setState({list:list.data})
    }


    render(){
        return(
            <>
            
            </>
        )
    }
}