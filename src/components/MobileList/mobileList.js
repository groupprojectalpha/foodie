import React from 'react';
import axios from 'axios';

export default class Mobile extends React.Component {
    state = {
        list: [],
        checkedOff: [],
        user: [],
        total:0
    }
    componentDidMount() {
        axios.get(`/list/${this.props.match.params.id}/items`).then((res) => {
            this.setState({ list: res.data })
            console.log(res.data)
        })
    }

    remove = (i) => {
        let arrCopy = this.state.list.slice()
        let checked = arrCopy.splice(i, 1)
        this.setState({
            list: arrCopy,
            checkedOff: [...this.state.checkedOff, checked[0]]
        })
        setTimeout(()=>{
            this.total()
        },0)
        


    }

    unRemove = (i) => {
        let arrCopy = this.state.list.slice()
        let unRemove = this.state.checkedOff.splice(i, 1);
        arrCopy.push(unRemove[0])
        this.setState({
            list: arrCopy
        })
        setTimeout(()=>{
            this.total()
        },0)

    }

    total = () => {
        if(this.state.checkedOff.length < 1){
            this.setState({total:0})
        }

        let total = 0;
        this.state.checkedOff.forEach((item) => {
            total += item.price / 100
            this.setState({total:Math.floor(total*100)/100})
        })
    }


    render() {
        let items = this.state.list.map((item, i) => {
            return <div key={i} onClick={() => this.remove(i)} >
                <p>{item.name}</p>
                <p>{item.price / 100}</p>
            </div>
        })

        let checkedArr = this.state.checkedOff.map((item, i) => {
            return <div key={i} onClick={() => this.unRemove(i)}>
                <p>{item.name}</p>
                <p>{item.price / 100}</p>
            </div>
        })
        return (
            <>
               <h1>Thank You For Choosing BudgetButler!</h1>
               <hr/>
            <h1>Your Total Is: {this.state.total}</h1>
                {items}
                <hr />
                <h1>Checked Off</h1>
                {checkedArr}
            </>
        )
    }
}