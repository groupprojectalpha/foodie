import React from 'react';
import axios from 'axios';

export default class Mobile extends React.Component{
    state={
        list:[],
        user:[]
    }
     componentDidMount(){
      axios.get(`/list/${this.props.match.params.id}`).then((res)=>{
        this.setState({list:res.data})
      })
    }

    remove=()=>{
        this.state.list.splice(1)
    }


    render(){
        let items = this.state.list.map((item,i)=>{
            return <div key={i} onClick={()=>this.remove} >
            <p>{item.name}</p>
            <p>{item.price/100}</p>

            </div>
        })
        return(
            <>
            {items}
            </>
        )
    }
}