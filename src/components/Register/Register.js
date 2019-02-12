import React from 'react';
import Button from '@material-ui/core/Button';

export default class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        }
    }

    async createNewUser()  {
    console.log('button hit')
    }

    handleUsername = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            username: value
        })
    }

    handlePassword = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            password: value
        })
    }

    handleFirstName = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            firstName: value
        })
    }


    handleLastName = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            lastName: value
        })
    }

    handleEmail = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            email: value
        })
    }

    handlePhoneNumber = ({ target: { value } }) => {
        this.setState({
            ...this.state,
            phoneNumber: value
        })
    }



    render(){
        return(
            <>
            <h1>Register Below</h1>
            <div><p>Username</p><input></input></div>
            <div><p>Password</p><input></input></div>
            <div><p>First Name</p><input></input></div>
            <div><p>Last Name</p><input></input></div>
            <div><p>Email</p><input></input></div>
            <div><p>Phone Number</p><input></input></div>
            <Button variant="outlined" color="primary" onClick={() => this.createNewUser()}>confirm</Button>
            </>
        )
    }
}