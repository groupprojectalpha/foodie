import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            state:'',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        }
    }

    // firstName:firstName, lastName:lastName,

    async createNewUser()  {
        const { username, password, firstName, lastName, email, phoneNumber, state } =this.state
        let res = await axios.post('/auth/register', {name:username, password:password, email:email, phone:phoneNumber, state:state})
        console.log(res)
    }


    render(){
        return(
            <>
            <h1>Register Below</h1>
            <div><p>Username</p><input onChange={(e)=>this.setState({username:e.target.value})}/></div>
            <div><p>Email</p><input onChange={(e)=>this.setState({email:e.target.value})} /></div>
            <div><p>Password</p><input onChange={(e)=>this.setState({password:e.target.value})}/></div>
            <div><p>State</p><input onChange={(e)=>this.setState({state:e.target.value})}/></div>
            {/* <div><p>First Name</p><input onChange={(e)=>this.setState({firstName:e.target.value})} /></div>
            <div><p>Last Name</p><input onChange={(e)=>this.setState({lastName:e.target.value})} /></div> */}
            <div><p>Phone Number</p><input onChange={(e)=>this.setState({phoneNumber:e.target.value})} /></div>
            <Button variant="outlined" color="primary" onClick={() => this.createNewUser()}>confirm</Button>
            </>
        )
    }
}