import React from 'react';
import axios from 'axios';

export default class AddStore extends React.Component{
  state = {
    nickname: '' ,
    chain: 0 ,
    storeId: '',
  }

  handleSubmit = async () => {
    let {nickname , chain , storeId } = this.state
    if(!nickname || !chain || !storeId){return alert("Please fill all fields to continue")}
    let res = await axios.post('/new/store' , this.state)
    console.log(res.data)
  }

  render(){
    console.log(this.state)
    return(
      <div className="addstore-main">
        <input value={this.state.nickname} onChange={(e) => this.setState({nickname: e.target.value})} />
        <select onChange={(e) => this.setState({chain: +e.target.value})}>
          <option value="0">Choose Chain</option>
          <option value="2">WalMart</option>
        </select>
        <input value={this.state.storeId} onChange={(e) => this.setState({storeId: e.target.value})} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}