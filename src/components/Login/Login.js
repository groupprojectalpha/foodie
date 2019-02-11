import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import LoginInput from './LoginInput';
import Button from '@material-ui/core/Button';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this.forceUpdate();
        axios.get(`/logout`)
         .then(res => {
           console.log(res)
           })
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

    // async register() {
    //     const { username, password } = this.state
    //     let res = await axios.post('/auth/register', { username: username, password: password })

    //     if (res.data.loggedIn) {
    //         this.props.updateUsername(res.data.user.username)
    //         // this.props.updateProfilePic(res.data.newUser.profile_pic)
    //         this.props.history.push('/register')
    //         console.log(res.data.message)
    //     } else { alert(res.data.message) }
    // }

    async login() {
        const { username, password } = this.state
        const res = await axios.post('/login', { username: username, password: password })

        if (res.data.loggedIn) {
            this.props.updateUsername(res.data.user.username)
           
            this.props.history.push('/dashboard')
            console.log(res.data.message)
            console.log(res.data.user)
        } else { alert(res.data.message) }
    }



    render(){

        console.log(this.state)

        return(
            <>
            <LoginInput handleUsername={this.handleUsername} handlePassword={this.handlePassword}></LoginInput>
            <div className='button-container'>
                        <Button variant="outlined" color="primary" onClick={() => this.login()}>Login</Button>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                        <Button> Register </Button>
                        </Link>
                        <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <Button> Skip </Button>
                        </Link>
                    </div> 
            </>
        )
    }
}

export default Login