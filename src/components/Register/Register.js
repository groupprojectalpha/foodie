import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { type } from 'os';
import { withRouter } from 'react-router-dom';
import SideDrawer from '../Appbar/SideDrawer'

 class Register extends React.Component{
    constructor(props){
        super(props)
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
        let res = await axios.post('/auth/register', {name:username, password:password, email:email, phone:phoneNumber, state:state}).catch(()=>{
            alert('Email already in use')
        })

        if(res.data){
            this.props.history.push('/add')
        }
    }


    render(){
        return(
            <>
             <SideDrawer/>
            <h1>Register Below</h1>
            <div><p>Username</p><input onChange={(e)=>this.setState({username:e.target.value})} type='text' maxLength='20' /></div>
            <div><p>Email</p><input onChange={(e)=>this.setState({email:e.target.value})} type='text' max='60' /></div>
            <div><p>Password</p><input onChange={(e)=>this.setState({password:e.target.value})} type='password' max='150' /></div>
            {/* <div><p>First Name</p><input onChange={(e)=>this.setState({firstName:e.target.value})} /></div>
            <div><p>Last Name</p><input onChange={(e)=>this.setState({lastName:e.target.value})} /></div> */}
            <div><p>Phone Number</p><input onChange={(e)=>this.setState({phoneNumber:e.target.value})} placeholder={'(555)-555-5555'} type='tel' maxLength='10' /></div>
            <div><p>State</p>
            <select onChange={(e)=>this.setState({state:e.target.value})} >
                <option value=''>Please choose state</option>
                <option value='AL'>Alabama - AL</option>
                <option value='AK'>Alaska - AK</option>
                <option value='AZ'>Arizona - AZ</option>
                <option value='AR'>Arkansas - AR</option>
                <option value='CA'>California - CA</option>
                <option value='CO'>Colorado - CO</option>
                <option value='CT'>Connecticut - CT</option>
                <option value='DE'>Delaware - DE</option>
                <option value='FL'>Florida - FL</option>
                <option value='GA'>Georgia - GA</option>
                <option value='HI'>Hawaii - HI</option>
                <option value='ID'>Idaho - ID</option>
                <option value='IL'>Illinois - IL</option>
                <option value='IN'>Indiana - IN</option>
                <option value='IA'>Iowa - IA</option>
                <option value='KS'>Kansas - KS</option>
                <option value='KY'>Kentucky - KY</option>
                <option value='LA'>Louisiana - LA</option>
                <option value='ME'>Maine - ME</option>
                <option value='MD'>Maryland - MD</option>
                <option value='MA'>Massachusetts - MA</option>
                <option value='MI'>Michigan - MI</option>
                <option value='MN'>Minnesota - MN</option>
                <option value='MS'>Mississippi - MS</option>
                <option value='MO'>Missouri - MO</option>
                <option value='MT'>Montana - MT</option>
                <option value='NE'>Nebraska - NE</option>
                <option value='NV'>Nevada - NV</option>
                <option value='NH'>New Hampshire - NH</option>
                <option value='NJ'>New Jersey - NJ</option>
                <option value='NM'>New Mexico - NM</option>
                <option value='NY'>New York - NY</option>
                <option value='NC'>North Carolina - NC</option>
                <option value='ND'>North Dakota - ND</option>
                <option value='OH'>Ohio - OH</option>
                <option value='OK'>Oklahoma - OK</option>
                <option value='OR'>Oregon - OR</option>
                <option value='PA'>Pennsylvania - PA</option>
                <option value='RI'>Rhode Island - RI</option>
                <option value='SC'>South Carolina - SC</option>
                <option value='SD'>South Dakota - SD</option>
                <option value='TN'>Tennessee - TN</option>
                <option value='TX'>Texas - TX</option>
                <option value='UT'>Utah - UT</option>
                <option value='VT'>Vermont - VT</option>
                <option value='VA'>Virginia - VA</option>
                <option value='WA'>Washington - WA</option>
                <option value='WV'>West Virginia - WV</option>
                <option value='WI'>Wisconsin - WI</option>
                <option value='WY'>Wyoming - WY</option>
                </select>
                </div>
            <Button variant="outlined" color="primary" onClick={() => this.createNewUser()}>confirm</Button>
            </>
        )
    }
}

export default withRouter(Register)